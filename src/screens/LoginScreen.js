import React, { useState } from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    TextInput, 
    TouchableOpacity, 
    ScrollView,
    Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { AppColors } from '../theme/Colors';
import { auth } from '../config/FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [obscurePassword, setObscurePassword] = useState(true);

    const handleLoginWithEmail = async () => {
    if (email === '' || password === '') {
        Alert.alert("Error", "Por favor, llena todos los campos");
        return;
    }

    try {
        await signInWithEmailAndPassword(auth, email.trim(), password);
        Alert.alert("¡Éxito!", "Bienvenido a Autoservicios Ñahui");
        navigation.replace('Home');
    } catch (error) {
        let message = "Ocurrió un error al iniciar sesión";
        if (error.code === 'auth/user-not-found') message = "Usuario no encontrado";
        if (error.code === 'auth/wrong-password') message = "Contraseña incorrecta";

        Alert.alert("Error de Login", message);
    }
};

    const handleGoogleSignIn = () => {
        Alert.alert("Google", "Aun en proceso");
    };

    const handleFacebookSignIn = () => {
        Alert.alert("Facebook", "Aun en proceso");
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <MaterialIcons name="arrow-back" size={28} color={AppColors.white} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Iniciar sesión</Text>
                    <View style={{ width: 28 }} />
                </View>

                <View style={styles.logoContainer}>
                    <MaterialIcons name="directions-car" size={64} color={AppColors.accentBlue} />
                    <Text style={styles.mainTitle}>Autoservicios Ñahui</Text>
                    <Text style={styles.subtitle}>Bienvenido de nuevo, ingresa tus credenciales</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.inputLabel}>Correo electrónico o teléfono</Text>
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

                    <Text style={[styles.inputLabel, { marginTop: 16 }]}>Contraseña</Text>
                    <View style={styles.inputContainer}>
                        <MaterialIcons name="lock-outline" size={20} color={AppColors.textSecondary} style={styles.inputIcon} />
                        <TextInput 
                            style={styles.input}
                            placeholder="••••••••"
                            placeholderTextColor="#5B627A"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={obscurePassword}
                        />
                        <TouchableOpacity onPress={() => setObscurePassword(!obscurePassword)}>
                            <MaterialIcons 
                                name={obscurePassword ? "visibility-off" : "visibility"} 
                                size={20} 
                                color={AppColors.textSecondary} 
                            />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.forgotPasswordContainer}>
                        <Text style={styles.forgotPasswordText}>¿Olvidé mi contraseña?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.primaryButton} onPress={handleLoginWithEmail}>
                        <Text style={styles.primaryButtonText}>Iniciar sesión</Text>
                    </TouchableOpacity>

                    <View style={styles.dividerContainer}>
                        <View style={styles.dividerLine} />
                        <Text style={styles.dividerText}>O continuar con</Text>
                        <View style={styles.dividerLine} />
                    </View>

                    <View style={styles.socialButtonsContainer}>
                        <TouchableOpacity style={styles.socialButton} onPress={handleGoogleSignIn}>
                            <FontAwesome5 name="google" size={18} color={AppColors.white} />
                            <Text style={styles.socialButtonText}>Google</Text>
                        </TouchableOpacity>
                        
                        <View style={{ width: 12 }} />

                        <TouchableOpacity style={styles.socialButton} onPress={handleFacebookSignIn}>
                            <FontAwesome5 name="facebook-f" size={18} color={AppColors.white} />
                            <Text style={styles.socialButtonText}>Facebook</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.footerRow}>
                    <Text style={styles.footerText}>¿No tienes cuenta? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.footerTextBold}>Registrarse</Text>
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
    logoContainer: {
        alignItems: 'center',
        marginBottom: 32,
    },
    mainTitle: {
        color: AppColors.white,
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
    },
    subtitle: {
        color: AppColors.textSecondary,
        fontSize: 14,
        textAlign: 'center',
    },
    card: {
        backgroundColor: AppColors.cardBackground,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#252B44',
        padding: 20,
        marginBottom: 32,
    },
    inputLabel: {
        color: AppColors.white,
        fontSize: 14,
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
    forgotPasswordContainer: {
        alignItems: 'flex-end',
        marginTop: 12,
        marginBottom: 24,
    },
    forgotPasswordText: {
        color: AppColors.accentBlue,
        fontWeight: 'bold',
        fontSize: 13,
    },
    primaryButton: {
        backgroundColor: AppColors.primaryBlue,
        height: 60,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    primaryButtonText: {
        color: AppColors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#252B44',
    },
    dividerText: {
        color: '#5B627A',
        fontSize: 12,
        paddingHorizontal: 12,
    },
    socialButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    socialButton: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: AppColors.primaryBlue,
        height: 50,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: AppColors.primaryBlue,
    },
    socialButtonText: {
        color: AppColors.white,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    footerText: {
        color: AppColors.textSecondary,
        fontSize: 14,
    },
    footerTextBold: {
        color: AppColors.accentBlue,
        fontWeight: 'bold',
        fontSize: 14,
    },
});