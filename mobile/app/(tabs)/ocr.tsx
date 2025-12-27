import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';

export default function OcrScreen() {
    const router = useRouter();
    const [permission, requestPermission] = useCameraPermissions();
    const [isScanning, setIsScanning] = useState(false);
    const cameraRef = useRef<CameraView>(null);

    const handleStartScanning = () => {
        if (!permission?.granted) {
            requestPermission();
        } else {
            setIsScanning(true);
        }
    };

    const handleTakePicture = async () => {
        if (cameraRef.current) {
            try {
                await cameraRef.current.takePictureAsync();
                Alert.alert("Captured", "Image captured successfully");
                setIsScanning(false);
            } catch (error) {
                console.error(error);
            }
        }
    };

    if (!isScanning) {
        return (
            <StartScanningView
                onBack={() => router.back()}
                onStart={handleStartScanning}
            />
        );
    }

    if (!permission) {
        return <View style={styles.container} />;
    }

    if (!permission.granted) {
        return (
            <PermissionView onRequestPermission={requestPermission} />
        );
    }

    return (
        <CameraScanningView
            cameraRef={cameraRef}
            onClose={() => setIsScanning(false)}
            onCapture={handleTakePicture}
        />
    );
}

function StartScanningView({ onBack, onStart }: { onBack: () => void, onStart: () => void }) {
    return (
        <SafeAreaView style={styles.startContainer}>
            <View style={styles.startHeader}>
                <TouchableOpacity style={styles.circleButton} onPress={onBack}>
                    <Ionicons name="arrow-back" size={24} color="#1F2937" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.circleButton}>
                    <Ionicons name="time-outline" size={24} color="#1F2937" />
                </TouchableOpacity>
            </View>

            <View style={styles.startContent}>
                <View style={styles.iconWrapper}>
                    <Ionicons name="scan-outline" size={64} color="#FFF" />
                </View>

                <Text style={styles.startTitle}>Use your camera to{'\n'}scan document</Text>
                <Text style={styles.startSubtitle}>Choose a place with good lighting.</Text>
            </View>

            <View style={styles.startFooter}>
                <TouchableOpacity style={styles.startButton} onPress={onStart}>
                    <Text style={styles.startButtonText}>Start scanning</Text>
                </TouchableOpacity>
            </View>

            <View style={[StyleSheet.absoluteFill, { zIndex: -1, backgroundColor: '#374151' }]} />
        </SafeAreaView>
    );
}

function PermissionView({ onRequestPermission }: { onRequestPermission: () => void }) {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={{ textAlign: 'center', marginBottom: 20 }}>We need your permission to show the camera</Text>
            <TouchableOpacity onPress={onRequestPermission} style={styles.startButton}>
                <Text style={styles.startButtonText}>Grant Permission</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

function CameraScanningView({ cameraRef, onClose, onCapture }: { cameraRef: React.RefObject<CameraView | null>, onClose: () => void, onCapture: () => void }) {
    return (
        <View style={styles.cameraContainer}>
            <CameraView style={styles.camera} facing="back" ref={cameraRef as React.RefObject<CameraView>}>
                <SafeAreaView style={styles.cameraOverlay}>
                    <View style={styles.cameraHeader}>
                        <TouchableOpacity style={styles.cameraCircleButton} onPress={onClose}>
                            <Ionicons name="arrow-back" size={24} color="#1F2937" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cameraCircleButton}>
                            <Ionicons name="time-outline" size={24} color="#1F2937" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.scanFrameContainer}>
                        <View style={[styles.corner, styles.topLeft]} />
                        <View style={[styles.corner, styles.topRight]} />
                        <View style={[styles.corner, styles.bottomLeft]} />
                        <View style={[styles.corner, styles.bottomRight]} />
                        <View style={styles.scanArea} />
                    </View>

                    <View style={styles.cameraFooter}>
                        <Text style={styles.cameraHint}>Align document within the frame</Text>
                        <TouchableOpacity style={styles.captureButton} onPress={onCapture}>
                            <View style={styles.captureInner} />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </CameraView>
        </View>
    );
}

const styles = StyleSheet.create({
    startContainer: {
        flex: 1,
        backgroundColor: '#1F2937',
    },
    startHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingTop: 12,
    },
    circleButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    startContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 32,
    },
    iconWrapper: {
        width: 120,
        height: 180,
        borderWidth: 4,
        borderColor: '#9CA3AF',
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 32,
    },
    startTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFF',
        textAlign: 'center',
        marginBottom: 12,
        lineHeight: 36,
    },
    startSubtitle: {
        fontSize: 16,
        color: '#D1D5DB',
        textAlign: 'center',
    },
    startFooter: {
        padding: 24,
        paddingBottom: 48,
    },
    startButton: {
        backgroundColor: '#FFF',
        paddingVertical: 18,
        borderRadius: 30,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    startButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111827',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cameraContainer: {
        flex: 1,
        backgroundColor: '#000',
    },
    camera: {
        flex: 1,
    },
    cameraOverlay: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'column',
    },
    cameraHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingTop: 12,
    },
    cameraCircleButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scanFrameContainer: {
        flex: 1,
        margin: 40,
        justifyContent: 'center',
        position: 'relative',
    },
    scanArea: {
        flex: 1,
        borderWidth: 0,
    },
    corner: {
        position: 'absolute',
        width: 40,
        height: 40,
        borderColor: '#D4E157',
        borderWidth: 6,
        borderRadius: 4,
    },
    topLeft: {
        top: 0,
        left: 0,
        borderBottomWidth: 0,
        borderRightWidth: 0,
    },
    topRight: {
        top: 0,
        right: 0,
        borderBottomWidth: 0,
        borderLeftWidth: 0,
    },
    bottomLeft: {
        bottom: 0,
        left: 0,
        borderTopWidth: 0,
        borderRightWidth: 0,
    },
    bottomRight: {
        bottom: 0,
        right: 0,
        borderTopWidth: 0,
        borderLeftWidth: 0,
    },
    cameraFooter: {
        paddingBottom: 48,
        alignItems: 'center',
    },
    cameraHint: {
        color: '#FFF',
        fontSize: 14,
        marginBottom: 24,
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 16,
        overflow: 'hidden',
    },
    captureButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255,255,255,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: '#FFF',
    },
    captureInner: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#FFF',
    }
});
