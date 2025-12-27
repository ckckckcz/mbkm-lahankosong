import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, TextInput, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { api } from '@/services/api';

const TABS = ['Groups', 'Shifts', 'Production Lines'];

export default function MasterDataScreen() {
    const [activeTab, setActiveTab] = useState('Groups');
    const [data, setData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    // Form State
    const [name, setName] = useState('');
    const [status, setStatus] = useState('Aktif');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            let result: any[] = [];
            if (activeTab === 'Groups') {
                result = await api.groups.getAll();
            } else if (activeTab === 'Shifts') {
                result = await api.shifts.getAll();
            } else if (activeTab === 'Production Lines') {
                result = await api.productionLines.getAll();
            }
            setData(result);
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Failed to fetch data");
        } finally {
            setIsLoading(false);
        }
    }, [activeTab]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleCreate = async () => {
        if (!name) {
            Alert.alert("Validation", "Name is required");
            return;
        }

        setIsSubmitting(true);
        try {
            const payload: any = { name, status };
            if (activeTab === 'Shifts') {
                payload.start_time = startTime;
                payload.end_time = endTime;
            }

            if (activeTab === 'Groups') await api.groups.create(payload);
            else if (activeTab === 'Shifts') await api.shifts.create(payload);
            else if (activeTab === 'Production Lines') await api.productionLines.create(payload);

            setModalVisible(false);
            resetForm();
            fetchData();
            Alert.alert("Success", "Data created successfully");
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Failed to create data");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = (id: string | number) => {
        Alert.alert(
            "Delete",
            "Are you sure you want to delete this item?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            if (activeTab === 'Groups') await api.groups.delete(id);
                            else if (activeTab === 'Shifts') await api.shifts.delete(id);
                            else if (activeTab === 'Production Lines') await api.productionLines.delete(id);
                            fetchData();
                        } catch (error) {
                            Alert.alert("Error", "Failed to delete item");
                        }
                    }
                }
            ]
        );
    };

    const resetForm = () => {
        setName('');
        setStatus('Aktif');
        setStartTime('');
        setEndTime('');
    };

    const renderBadge = (status: string) => {
        let bg = '#E0F2FE';
        let text = '#0284C7';

        if (status === 'Aktif') {
            bg = '#DCFCE7';
            text = '#15803D';
        } else if (status === 'Tidak Aktif') {
            bg = '#FEE2E2';
            text = '#B91C1C';
        }

        return (
            <View style={[styles.badge, { backgroundColor: bg }]}>
                <Text style={[styles.badgeText, { color: text }]}>{status}</Text>
            </View>
        );
    };

    const renderModal = () => (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Add New {activeTab.slice(0, -1)}</Text>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Ionicons name="close" size={24} color="#6B7280" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView contentContainerStyle={styles.formContainer}>
                        <Text style={styles.label}>Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter name"
                            value={name}
                            onChangeText={setName}
                        />

                        {activeTab === 'Shifts' && (
                            <View style={styles.rowInputs}>
                                <View style={{ flex: 1, marginRight: 8 }}>
                                    <Text style={styles.label}>Start Time</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="08:00"
                                        value={startTime}
                                        onChangeText={setStartTime}
                                    />
                                </View>
                                <View style={{ flex: 1, marginLeft: 8 }}>
                                    <Text style={styles.label}>End Time</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="16:00"
                                        value={endTime}
                                        onChangeText={setEndTime}
                                    />
                                </View>
                            </View>
                        )}

                        <Text style={styles.label}>Status</Text>
                        <View style={styles.statusContainer}>
                            {['Aktif', 'Tidak Aktif'].map((s) => (
                                <TouchableOpacity
                                    key={s}
                                    style={[styles.statusButton, status === s && styles.statusButtonActive]}
                                    onPress={() => setStatus(s)}
                                >
                                    <Text style={[styles.statusText, status === s && styles.statusTextActive]}>{s}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <TouchableOpacity
                            style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
                            onPress={handleCreate}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? <ActivityIndicator color="#FFF" /> : <Text style={styles.submitButtonText}>Create</Text>}
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.headerTitle}>Master Data</Text>
                    <Text style={styles.headerSubtitle}>Manage your reference data</Text>
                </View>
                <TouchableOpacity
                    style={styles.addButton}
                    activeOpacity={0.8}
                    onPress={() => {
                        resetForm();
                        setModalVisible(true);
                    }}
                >
                    <Ionicons name="add" size={24} color="#FFF" />
                </TouchableOpacity>
            </View>

            <View style={styles.tabsContainer}>
                {TABS.map(tab => {
                    const isActive = activeTab === tab;
                    return (
                        <TouchableOpacity
                            key={tab}
                            style={[styles.tabButton, isActive && styles.activeTabButton]}
                            onPress={() => setActiveTab(tab)}
                            activeOpacity={0.7}
                        >
                            <Text style={[styles.tabText, isActive && styles.activeTabText]}>{tab}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>

            <View style={styles.contentHeader}>
                <Text style={styles.sectionTitle}>{activeTab} List</Text>
                <Text style={styles.itemCount}>{data.length} items</Text>
            </View>

            {isLoading ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#388E3C" />
                </View>
            ) : (
                <FlatList
                    data={data}
                    keyExtractor={(item: any) => item.id.toString()}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    refreshing={isLoading}
                    onRefresh={fetchData}
                    renderItem={({ item }: { item: any }) => (
                        <View style={styles.card}>
                            <View style={styles.cardHeader}>
                                <View style={styles.iconContainer}>
                                    <Ionicons
                                        name={activeTab === 'Groups' ? 'people' : activeTab === 'Shifts' ? 'time' : 'layers'}
                                        size={20}
                                        color="#388E3C"
                                    />
                                </View>
                                <Text style={styles.cardTitle}>{item.name}</Text>
                                <TouchableOpacity onPress={() => handleDelete(item.id)} style={{ padding: 4 }}>
                                    <Ionicons name="trash-outline" size={18} color="#EF4444" />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.divider} />

                            <View style={styles.cardFooter}>
                                {activeTab === 'Shifts' && (
                                    <View style={styles.infoRow}>
                                        <Ionicons name="time-outline" size={14} color="#6B7280" />
                                        <Text style={styles.infoText}>{item.start_time} - {item.end_time}</Text>
                                    </View>
                                )}
                                <View style={styles.statusContainer}>
                                    {renderBadge(item.status)}
                                </View>
                            </View>
                        </View>
                    )}
                />
            )}

            {renderModal()}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: '#FFFFFF',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#111827',
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#6B7280',
        marginTop: 4,
    },
    addButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#388E3C',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#388E3C",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    tabsContainer: {
        flexDirection: 'row',
        backgroundColor: '#E5E7EB',
        borderRadius: 12,
        marginHorizontal: 24,
        marginTop: 16,
        padding: 4,
    },
    tabButton: {
        flex: 1,
        paddingVertical: 8,
        alignItems: 'center',
        borderRadius: 8,
    },
    activeTabButton: {
        backgroundColor: '#FFFFFF',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    tabText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#6B7280',
    },
    activeTabText: {
        color: '#388E3C',
    },
    contentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        marginTop: 24,
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#374151',
    },
    itemCount: {
        fontSize: 12,
        color: '#9CA3AF',
        fontWeight: '500',
    },
    listContent: {
        paddingHorizontal: 24,
        paddingBottom: 100,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#F3F4F6',
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    iconContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#ECFDF5',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
        flex: 1,
    },
    divider: {
        height: 1,
        backgroundColor: '#F3F4F6',
        marginBottom: 12,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    infoText: {
        fontSize: 13,
        color: '#6B7280',
        fontWeight: '500',
    },
    statusContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    badge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
        marginLeft: 'auto',
    },
    badgeText: {
        fontSize: 11,
        fontWeight: '600',
    },

    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#FFF',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
        maxHeight: '80%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#111827',
    },
    formContainer: {
        paddingBottom: 24,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: '#374151',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#F9FAFB',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        color: '#111827',
        marginBottom: 16,
    },
    rowInputs: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    statusButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        marginRight: 8,
    },
    statusButtonActive: {
        backgroundColor: '#DCFCE7',
        borderColor: '#16A34A',
    },
    statusText: {
        fontSize: 14,
        color: '#6B7280',
    },
    statusTextActive: {
        color: '#16A34A',
        fontWeight: '600',
    },
    submitButton: {
        backgroundColor: '#388E3C',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 24,
    },
    submitButtonDisabled: {
        backgroundColor: '#A5D6A7',
    },
    submitButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
