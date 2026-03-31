import React, { useState } from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    TextInput, 
    TouchableOpacity, 
    ScrollView,
    Alert,
    ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { AppColors } from '../theme/Colors';

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../config/firebaseConfig'; 

export default function RegisterScreen({ navigation }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [obscurePassword, setObscurePassword] = useState(true);
    const [obscureConfirmPassword, setObscureConfirmPassword] = useState(true);
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async () => {
        if (!acceptedTerms) {
            Alert.alert('Atención', 'Debes aceptar los términos y condiciones');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Error', 'Las contraseñas no coinciden');
            return;
        }

        if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
            Alert.alert('Campos incompletos', 'Por favor, completa todos los campos');
            return;
        }

        setIsLoading(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth, 
                email.trim(), 
                password.trim()
            );

            await updateProfile(userCredential.user, {
                displayName: name.trim()
            });

            Alert.alert('¡Éxito!', 'Cuenta creada con éxito. Por favor inicia sesión.');
            navigation.replace('Login');

        } catch (error) {
            let errorMessage = 'Ocurrió un error al registrarse';
            
            if (error.code === 'auth/weak-password') {
                errorMessage = 'La contraseña es muy débil (mínimo 6 caracteres)';
            } else if (error.code === 'auth/email-already-in-use') {
                errorMessage = 'Ya existe una cuenta con este correo';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'El formato del correo no es válido';
            }

            Alert.alert('Error', errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const CustomInput = ({ label, hint, icon, value, onChangeText, isPassword, obscure, toggleObscure, keyboardType = 'default' }) => (
        <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>{label}</Text>
            <View style={styles.inputContainer}>
                <MaterialIcons name={icon} size={20} color="#6B6E84" style={styles.inputIcon} />
                <TextInput 
                    style={styles.input}
                    placeholder={hint}
                    placeholderTextColor="#6B6E84"
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={isPassword ? obscure : false}
                    keyboardType={keyboardType}
                    autoCapitalize={keyboardType === 'email-address' ? 'none' : 'words'}
                />
                {isPassword && (
                    <TouchableOpacity onPress={toggleObscure} style={styles.eyeIcon}>
                        <MaterialIcons 
                            name={obscure ? "visibility-off" : "visibility"} 
                            size={20} 
                            color="#6B6E84" 
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <MaterialIcons name="arrow-back" size={28} color={AppColors.white} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Registro</Text>
                    <View style={{ width: 28 }} />
                </View>

                <View style={styles.titleContainer}>
                    <Text style={styles.mainTitle}>Autoservicios Ñahui</Text>
                    <Text style={styles.subtitle}>Crea tu cuenta para empezar</Text>
                </View>

                <CustomInput 
                    label="Nombre completo" 
                    hint="Ej. Juan Pérez" 
                    icon="person-outline" 
                    value={name} 
                    onChangeText={setName} 
                />
                
                <CustomInput 
                    label="Correo electrónico" 
                    hint="ejemplo@correo.com" 
                    icon="mail-outline" 
                    value={email} 
                    onChangeText={setEmail} 
                    keyboardType="email-address"
                />
                
                <CustomInput 
                    label="Contraseña" 
                    hint="••••••••" 
                    icon="lock-outline" 
                    value={password} 
                    onChangeText={setPassword} 
                    isPassword={true}
                    obscure={obscurePassword}
                    toggleObscure={() => setObscurePassword(!obscurePassword)}
                />
                
                <CustomInput 
                    label="Confirmar contraseña" 
                    hint="••••••••" 
                    icon="lock-outline" 
                    value={confirmPassword} 
                    onChangeText={setConfirmPassword} 
                    isPassword={true}
                    obscure={obscureConfirmPassword}
                    toggleObscure={() => setObscureConfirmPassword(!obscureConfirmPassword)}
                />

                <View style={styles.termsContainer}>
                    <TouchableOpacity 
                        style={styles.checkbox} 
                        onPress={() => setAcceptedTerms(!acceptedTerms)}
                    >
                        <MaterialIcons 
                            name={acceptedTerms ? "check-box" : "check-box-outline-blank"} 
                            size={24} 
                            color={acceptedTerms ? AppColors.accentBlue : "#6B6E84"} 
                        />
                    </TouchableOpacity>
                    <Text style={styles.termsText}>Acepto los </Text>
                    <TouchableOpacity>
                        <Text style={styles.termsTextBold}>términos y condiciones</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity 
                    style={[styles.primaryButton, isLoading && styles.buttonDisabled]} 
                    onPress={handleRegister}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator color={AppColors.white} />
                    ) : (
                        <Text style={styles.primaryButtonText}>Crear cuenta</Text>
                    )}
                </TouchableOpacity>

                <View style={styles.footerRow}>
                    <Text style={styles.footerText}>¿Ya tienes cuenta? </Text>
                    <TouchableOpacity onPress={() => navigation.replace('Login')}>
                        <Text style={styles.footerTextBold}>Iniciar sesión</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: AppColors.background,
    },
    scrollContainer: {
        padding: 24,
        flexGrow: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 32,
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        color: AppColors.white,
        fontSize: 18,
        fontWeight: 'bold',
    },
    titleContainer: {
        alignItems: 'center',
        marginBottom: 32,
    },
    mainTitle: {
        color: AppColors.white,
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    subtitle: {
        color: '#8B8E9F',
        fontSize: 14,
        marginTop: 8,
    },
    inputWrapper: {
        marginBottom: 16,
    },
    inputLabel: {
        color: AppColors.white,
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: AppColors.inputFill,
        borderRadius: 12,
        paddingHorizontal: 16,
        height: 56,
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        color: AppColors.white,
        fontSize: 16,
    },
    eyeIcon: {
        padding: 4,
    },
    termsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
        marginTop: 8,
    },
    checkbox: {
        marginRight: 8,
    },
    termsText: {
        color: '#8B8E9F',
        fontSize: 14,
    },
    termsTextBold: {
        color: AppColors.accentBlue,
        fontSize: 14,
        fontWeight: 'bold',
    },
    primaryButton: {
        backgroundColor: AppColors.primaryBlue,
        height: 60,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 32,
    },
    buttonDisabled: {
        opacity: 0.7,
    },
    primaryButtonText: {
        color: AppColors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    footerText: {
        color: '#8B8E9F',
        fontSize: 14,
    },
    footerTextBold: {
        color: AppColors.accentBlue,
        fontSize: 14,
        fontWeight: 'bold',
    },
});