import React, { useState } from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    TextInput, 
    TouchableOpacity, 
    ScrollView,
    Image,
    Alert,
    ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { AppColors } from '../theme/Colors';

import { getFirebaseAuth } from '../config/firebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';

export default function ForgotPasswordScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleResetPassword = async () => {
        if (email.trim() === '') {
            Alert.alert("Error", "Por favor, ingresa tu correo electrónico");
            return;
        }

        setIsLoading(true);
        const auth = getFirebaseAuth();

        try {
            await sendPasswordResetEmail(auth, email.trim());
            Alert.alert(
                "Correo enviado", 
                "Revisa tu bandeja de entrada o spam para restablecer tu contraseña."
            );
            navigation.goBack();
        } catch (error) {
            let message = "Ocurrió un error al intentar enviar el correo";
            
            if (error.code === 'auth/invalid-email') {
                message = "El formato del correo no es válido";
            } else if (error.code === 'auth/user-not-found') {
                message = "Este correo no está registrado en el sistema";
            }

            Alert.alert("Error", message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                
                <View style={styles.header}>
                    <MaterialIcons name="directions-car" size={28} color={AppColors.white} />
                    <Text style={styles.headerTitle}>Autoservicios Ñahui</Text>
                    <View style={{ width: 28 }} />
                </View>

                <View style={styles.imageContainer}>
                    <Image 
                        source={require('../../assets/car_ferrari.jpg')} 
                        style={styles.image}
                        resizeMode="cover"
                    />
                </View>

                <Text style={styles.mainTitle}>Recuperar contraseña</Text>
                <Text style={styles.subtitle}>
                    Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña
                </Text>

                <Text style={styles.inputLabel}>CORREO ELECTRÓNICO</Text>
                <View style={styles.inputContainer}>
                    <MaterialIcons name="mail-outline" size={20} color={AppColors.textSecondary} style={styles.inputIcon} />
                    <TextInput 
                        style={styles.input}
                        placeholder="ejemplo@correo.com"
                        placeholderTextColor="#5B627A"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                <View style={{ height: 32 }} />

                <TouchableOpacity 
                    style={[styles.primaryButton, isLoading && { opacity: 0.7 }]} 
                    onPress={handleResetPassword}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator color={AppColors.white} />
                    ) : (
                        <View style={styles.buttonContent}>
                            <Text style={styles.primaryButtonText}>Enviar enlace de recuperación</Text>
                            <View style={{ width: 10 }} />
                            <MaterialIcons name="arrow-forward" size={20} color={AppColors.white} />
                        </View>
                    )}
                </TouchableOpacity>

                <View style={{ height: 32 }} />

                <TouchableOpacity style={styles.footerRow} onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={18} color={AppColors.white} />
                    <View style={{ width: 8 }} />
                    <Text style={styles.footerTextBold}>Volver al inicio de sesión</Text>
                </TouchableOpacity>

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
    headerTitle: {
        color: AppColors.white,
        fontSize: 18,
        fontWeight: 'bold',
    },
    imageContainer: {
        height: 180,
        width: '100%',
        backgroundColor: '#161B2E',
        borderRadius: 16,
        marginBottom: 24,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    mainTitle: {
        color: AppColors.white,
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    subtitle: {
        color: AppColors.textSecondary,
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 32,
    },
    inputLabel: {
        color: '#C4CBFF',
        fontSize: 12,
        fontWeight: 'bold',
        letterSpacing: 0.8,
        marginBottom: 8,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1C223A',
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
    primaryButton: {
        backgroundColor: AppColors.primaryBlue,
        height: 60,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
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
    },
    footerTextBold: {
        color: AppColors.white,
        fontWeight: 'bold',
        fontSize: 14,
    },
});