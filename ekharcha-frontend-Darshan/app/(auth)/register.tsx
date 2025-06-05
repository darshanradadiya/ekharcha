import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { AxiosError } from "axios";
import { router } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import api from "../../utils/api";

type FieldErrors = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  password?: string;
  otp?: string;
  general?: string;
};

export default function RegisterWithOTP() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOTP] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [showOTPForm, setShowOTPForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateRegister = useCallback(() => {
    const newErrors: FieldErrors = {};
    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Invalid email address";
    if (!phone.trim()) newErrors.phone = "Phone number is required";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    return newErrors;
  }, [firstName, lastName, email, phone, password]);

  const validateOTP = useCallback(() => {
    const newErrors: FieldErrors = {};
    if (!otp.trim()) newErrors.otp = "OTP is required";
    else if (!/^\d{6}$/.test(otp)) newErrors.otp = "OTP must be 6 digits";
    return newErrors;
  }, [otp]);

  const handleRegister = useCallback(async () => {
    const validationErrors = validateRegister();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      // ...existing code...
      await api.post("/api/auth/register", {
        firstName,
        lastName,
        email,
        phoneNumber: phone, // <-- fix here
        password,
      });
      // ...existing code...

      setShowOTPForm(true);
      Alert.alert("OTP Sent", "Please check your phone for the OTP");
    } catch (error: unknown) {
      const err = error as AxiosError<{ message: string }>;
      const message =
        err.response?.data?.message || err.message || "Registration failed";
      setErrors({ general: message });
      Alert.alert("Registration Failed", message);
    } finally {
      setIsLoading(false);
    }
  }, [firstName, lastName, email, phone, password]);

  const handleVerifyOTP = useCallback(async () => {
    const validationErrors = validateOTP();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      await api.post("/api/auth/verify-otp", {
        email,
        otp,
      });

      Alert.alert("Success", "Your account is verified!");
      router.replace("/(tabs)/dashboard");
    } catch (error: unknown) {
      const err = error as AxiosError<{ message: string }>;
      const message =
        err.response?.data?.message || err.message || "OTP verification failed";
      setErrors({ general: message });
      Alert.alert("OTP Verification Failed", message);
    } finally {
      setIsLoading(false);
    }
  }, [email, otp]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.form}>
            {!showOTPForm ? (
              <>
                <Text style={styles.title}>Register</Text>
                <Input
                  label="First Name"
                  value={firstName}
                  onChangeText={(text) => {
                    setFirstName(text);
                    if (errors.firstName)
                      setErrors((e) => ({ ...e, firstName: undefined }));
                  }}
                  placeholder="Enter your first name"
                  error={errors.firstName}
                />
                <Input
                  label="Last Name"
                  value={lastName}
                  onChangeText={(text) => {
                    setLastName(text);
                    if (errors.lastName)
                      setErrors((e) => ({ ...e, lastName: undefined }));
                  }}
                  placeholder="Enter your last name"
                  error={errors.lastName}
                />
                <Input
                  label="Email"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    if (errors.email)
                      setErrors((e) => ({ ...e, email: undefined }));
                  }}
                  placeholder="Enter your email"
                  error={errors.email}
                />
                <Input
                  label="Phone Number"
                  // keyboardType="phone-pad"
                  value={phone}
                  onChangeText={(text) => {
                    setPhone(text);
                    if (errors.phone)
                      setErrors((e) => ({ ...e, phone: undefined }));
                  }}
                  placeholder="Enter your phone number"
                  error={errors.phone}
                />
                <Input
                  label="Password"
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    if (errors.password)
                      setErrors((e) => ({ ...e, password: undefined }));
                  }}
                  placeholder="Create a password"
                  secureTextEntry
                  error={errors.password}
                />
                {errors.general ? (
                  <Text style={styles.generalError}>{errors.general}</Text>
                ) : null}
                <Button
                  title="Register"
                  onPress={handleRegister}
                  loading={isLoading}
                />
              </>
            ) : (
              <>
                <Text style={styles.title}>Verify OTP</Text>
                <Input
                  label="OTP"
                  // keyboardType="number-pad"
                  value={otp}
                  onChangeText={(text) => {
                    setOTP(text);
                    if (errors.otp)
                      setErrors((e) => ({ ...e, otp: undefined }));
                  }}
                  placeholder="Enter the 6-digit OTP"
                  error={errors.otp}
                />
                {errors.general ? (
                  <Text style={styles.generalError}>{errors.general}</Text>
                ) : null}
                <Button
                  title="Verify OTP"
                  onPress={handleVerifyOTP}
                  loading={isLoading}
                />
                <Button
                  title="Back to Register"
                  variant="outline"
                  onPress={() => {
                    setShowOTPForm(false);
                    setOTP("");
                    setErrors({});
                  }}
                  disabled={isLoading}
                />
              </>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollView: { flex: 1 },
  scrollContent: { flexGrow: 1, justifyContent: "center", padding: 24 },
  form: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },
  generalError: {
    color: "#dc2626",
    fontSize: 14,
    marginBottom: 12,
    textAlign: "center",
  },
});
