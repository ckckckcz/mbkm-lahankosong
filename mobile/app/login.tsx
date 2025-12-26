import { View, Text, StyleSheet, Image, TextInput, Pressable, Dimensions, KeyboardAvoidingView, Platform, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import Animated, { FadeInUp } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');
const API_URL = 'https://lahankosong-backend.vercel.app/api/auth/login';

export default function LoginScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        // Validation
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in both email and password.');
            return;
        }

        setIsLoading(true);

        try {
            console.log("Attempting login to:", API_URL);
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Login failed');
            }

            // Success
            console.log("Login successful:", data);
            // Here you would typically store the token
            // await AsyncStorage.setItem('token', data.token); 

            Alert.alert('Success', 'Login successful!', [
                { text: 'OK', onPress: () => router.replace('/(tabs)') }
            ]);

        } catch (error: any) {
            console.error("Login error:", error);
            Alert.alert('Login Failed', error.message || 'Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <StatusBar style="light" />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>

                {/* Header Image Section */}
                <View style={styles.headerContainer}>
                    <Image
                        source={require('@/assets/images/factory.png')}
                        style={styles.headerImage}
                        resizeMode="cover"
                    />
                    <View style={styles.headerOverlay} />
                    <View style={styles.headerContent}>
                        <Image
                            source={require('@/assets/images/greenfields.png')}
                            style={{ width: 200, height: 50, tintColor: '#fff' }}
                            resizeMode="contain"
                        />
                    </View>
                </View>

                {/* Form Section */}
                <Animated.View entering={FadeInUp.delay(300).springify()} style={styles.formContainer}>

                    {/* Email Input */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="example@greenfields.com"
                            placeholderTextColor="#9ca3af"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            editable={!isLoading}
                        />
                    </View>

                    {/* Password Input */}
                    <View style={styles.inputGroup}>
                        <View style={styles.passwordHeader}>
                            <Text style={styles.label}>Kata Sandi</Text>
                        </View>
                        <View style={styles.passwordContainer}>
                            <TextInput
                                style={styles.passwordInput}
                                placeholder="••••••••"
                                placeholderTextColor="#9ca3af"
                                secureTextEntry={!showPassword}
                                value={password}
                                onChangeText={setPassword}
                                editable={!isLoading}
                            />
                            <Pressable onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                                <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#6b7280" />
                            </Pressable>
                        </View>
                    </View>

                    {/* Remember Me */}
                    <Pressable style={styles.checkboxContainer} onPress={() => setRememberMe(!rememberMe)} disabled={isLoading}>
                        <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                            {rememberMe && <Ionicons name="checkmark" size={12} color="#fff" />}
                        </View>
                        <Text style={styles.checkboxLabel}>Ingat saya!</Text>
                    </Pressable>

                    {/* Login Button */}
                    <Pressable
                        style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
                        onPress={handleLogin}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.loginButtonText}>Masuk</Text>
                        )}
                    </Pressable>

                    {/* Footer */}
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Don't have an account? </Text>
                        <Pressable disabled={isLoading}>
                            <Text style={styles.signUpText}>Sign up</Text>
                        </Pressable>
                    </View>

                </Animated.View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerContainer: {
        height: 300,
        width: '100%',
        position: 'relative',
    },
    headerImage: {
        width: '100%',
        height: '100%',
    },
    headerOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    headerContent: {
        position: 'absolute',
        bottom: 50,
        left: 0,
        right: 0,
        padding: 30,
        alignItems: 'center',
        zIndex: 1,
    },
    appTitle: {
        fontSize: 24,
        fontWeight: '800',
        color: '#fff',
        marginBottom: 8,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    headerSubtitle: {
        fontSize: 18,
        color: '#f3f4f6',
        fontWeight: '500',
        opacity: 0.9,
    },
    formContainer: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: -50, // More overlap
        borderTopLeftRadius: 20, // Rounder corners
        borderTopRightRadius: 20,
        paddingHorizontal: 28,
        paddingTop: 40,
        paddingBottom: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 10,
    },
    inputGroup: {
        marginBottom: 24, // More breathing room
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#4b5563', // Lighter gray for labels
        marginBottom: 8,
        marginLeft: 4,
    },
    input: {
        width: '100%',
        height: 56, // Taller inputs
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRadius: 15, // Smoother corners
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#111827',
        backgroundColor: '#f9fafb', // Light gray background
    },
    passwordHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
        paddingHorizontal: 4,
    },
    forgotPassword: {
        fontSize: 14,
        color: '#388E3C',
        fontWeight: '600',
    },
    passwordContainer: {
        width: '100%',
        height: 56, // Taller inputs
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#f9fafb',
    },
    passwordInput: {
        flex: 1,
        fontSize: 16,
        color: '#111827',
        height: '100%',
    },
    eyeIcon: {
        padding: 2,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 32,
        paddingHorizontal: 4,
    },
    checkbox: {
        width: 22,
        height: 22,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#d1d5db',
        marginRight: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxChecked: {
        backgroundColor: '#388E3C',
        borderColor: '#388E3C',
    },
    checkboxLabel: {
        fontSize: 14,
        color: '#6b7280',
        fontWeight: '500',
    },
    loginButton: {
        width: '100%',
        height: 60, // Bigger button
        backgroundColor: '#388E3C',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#388E3C",
        shadowOffset: { width: 0, height: 8 }, // Deeper shadow
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 8,
        marginBottom: 32,
    },
    loginButtonDisabled: {
        backgroundColor: '#A5D6A7', // Lighter green for disabled state
        shadowOpacity: 0,
        elevation: 0,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 32,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#e5e7eb',
    },
    dividerText: {
        marginHorizontal: 16,
        color: '#9ca3af',
        fontSize: 14,
        fontWeight: '500',
    },
    socialContainer: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 40,
    },
    socialButton: {
        flex: 1,
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.5,
        borderColor: '#e5e7eb',
        borderRadius: 28,
        gap: 10,
        backgroundColor: '#fff',
    },
    socialText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#374151',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 40,
    },
    footerText: {
        color: '#6b7280',
        fontSize: 14,
    },
    signUpText: {
        color: '#388E3C',
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 4,
    },
});
