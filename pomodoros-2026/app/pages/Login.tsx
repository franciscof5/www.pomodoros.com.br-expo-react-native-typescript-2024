import axios from "axios";
import { useRouter } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { Button, MD3Colors, ProgressBar, TextInput } from "react-native-paper";
import Toast from 'react-native-root-toast';
import { WizardStore } from "../../storage";

export default function LoginScreen() {

  const router = useRouter(); // ← Expo Router way 👍

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ defaultValues: WizardStore.useState((s) => s) });

  const onSubmit = async () => {
    try {
      const r = await axios.post("https://www.pomodoros.com.br/wp-json/jwt-auth/v1/token", {
        username: "foca",
        password: "931777"
      });

      let token = r.data.token;
      const r2 = await axios.post("https://www.pomodoros.com.br/wp-json/wp/v2/users/me", null, {
        headers: { Authorization: `Bearer ${token}` }
      });

      WizardStore.update(s => {
        s.token = token;
        s.user = r2.data;
      });

      Toast.show(`Bem vindo ${r2.data.username}`, { position: 0 });

      router.push("/pages/Focus"); // ← NAVEGAÇÃO AQUI 🚀

    } catch (err) {
      Toast.show("Erro ao fazer login", { position: 0 });
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <ProgressBar style={styles.progressBar} progress={WizardStore.getRawState().progress} color={MD3Colors.primary60} />

      <View style={{ paddingHorizontal: 16 }}>

        <View style={styles.formEntry}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput mode="outlined" label="Usuário" onBlur={onBlur} onChangeText={onChange} value={value} />
            )}
            name="username"
          />
        </View>

        <View style={styles.formEntry}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput mode="outlined" label="Senha" onBlur={onBlur} onChangeText={onChange} value={value} secureTextEntry />
            )}
            name="password"
          />
        </View>

        <Button mode="outlined" style={styles.button} onPress={handleSubmit(onSubmit)}>
          ENTRAR
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  progressBar: { marginBottom: 16 },
  button: { margin: 8 },
  formEntry: { margin: 8 },
});
