import { Colors, FontFamily, FontSize, Spacing } from '@/constants/theme';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { authService } from '../../src/domain/services/auth.service';

export default function SignupScreen() {
    const insets = useSafeAreaInsets();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignup = async () => {
        if (!email || !password || !confirmPassword) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            await authService.signUp(email, password);
            router.replace('/(tabs)');
        } catch (error: any) {
            Alert.alert('Registration Failed', error.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={[styles.content, { paddingTop: insets.top + 40 }]}>
                <View style={styles.header}>
                    <Text style={styles.title}>Create account</Text>
                    <Text style={styles.subtitle}>Join MetricMe and track your health</Text>
                </View>

                <View style={styles.form}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="name@example.com"
                            placeholderTextColor="#666"
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                            keyboardType="email-address"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="••••••••"
                            placeholderTextColor="#666"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Confirm Password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="••••••••"
                            placeholderTextColor="#666"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry
                        />
                    </View>

                    <Pressable
                        style={({ pressed }) => [
                            styles.signupBtn,
                            pressed && styles.pressed,
                            loading && styles.disabled,
                        ]}
                        onPress={handleSignup}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color={Colors.background} />
                        ) : (
                            <Text style={styles.signupBtnText}>Create Account</Text>
                        )}
                    </Pressable>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Already have an account? </Text>
                        <Pressable onPress={() => router.back()}>
                            <Text style={styles.footerAction}>Login</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    content: {
        flexGrow: 1,
        paddingHorizontal: Spacing.xl,
        paddingBottom: Spacing.xl,
    },
    header: {
        marginBottom: Spacing.xl,
    },
    title: {
        fontSize: FontSize['3xl'],
        fontFamily: FontFamily.bold,
        color: Colors.text,
        marginBottom: Spacing.xs,
    },
    subtitle: {
        fontSize: FontSize.base,
        color: '#999',
    },
    form: {
        gap: Spacing.lg,
    },
    inputContainer: {
        gap: Spacing.xs,
    },
    label: {
        fontSize: FontSize.sm,
        fontFamily: FontFamily.semiBold,
        color: Colors.text,
        marginLeft: 4,
    },
    input: {
        height: 56,
        backgroundColor: '#1A1A1A',
        borderRadius: 16,
        paddingHorizontal: Spacing.md,
        color: Colors.text,
        fontSize: FontSize.base,
        borderWidth: 1,
        borderColor: '#333',
    },
    signupBtn: {
        height: 56,
        backgroundColor: Colors.primary,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Spacing.md,
    },
    signupBtnText: {
        fontSize: FontSize.base,
        fontFamily: FontFamily.bold,
        color: Colors.background,
    },
    pressed: {
        opacity: 0.8,
        transform: [{ scale: 0.98 }],
    },
    disabled: {
        opacity: 0.5,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: Spacing.sm,
    },
    footerText: {
        color: '#999',
        fontSize: FontSize.sm,
    },
    footerAction: {
        color: Colors.primary,
        fontSize: FontSize.sm,
        fontFamily: FontFamily.bold,
    },
});
