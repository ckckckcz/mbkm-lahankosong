import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { api } from '@/services/api';

const renderBadge = (quality: string) => {
    let bg = '#E0F2FE';
    let text = '#0284C7';

    if (quality === 'OK') {
        bg = '#DCFCE7';
        text = '#15803D';
    } else if (quality === 'NOT OK') {
        bg = '#FEE2E2';
        text = '#B91C1C';
    }

    return (
        <View style={[styles.badge, { backgroundColor: bg }]}>
            <Text style={[styles.badgeText, { color: text }]}>{quality}</Text>
        </View>
    );
};

export default function OperationScreen() {
    const [data, setData] = useState<any[]>([]);
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [activeFilter, setActiveFilter] = useState('All');
    const [isLoading, setIsLoading] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [groups, setGroups] = useState<any[]>([]);
    const [shifts, setShifts] = useState<any[]>([]);
    const [lines, setLines] = useState<any[]>([]);

    const [selectedGroup, setSelectedGroup] = useState<any>(null);
    const [selectedShift, setSelectedShift] = useState<any>(null);
    const [selectedLine, setSelectedLine] = useState<any>(null);
    const [temperature, setTemperature] = useState('');
    const [weight, setWeight] = useState('');
    const [quality, setQuality] = useState('OK');
    const [inputMethod, setInputMethod] = useState('Manual');

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const result = await api.operations.getAll();
            result.sort((a: any, b: any) => new Date(b.created_at || b.date).getTime() - new Date(a.created_at || a.date).getTime());
            setData(result);
            setFilteredData(result);
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Failed to fetch operations");
        } finally {
            setIsLoading(false);
        }
    }, []);

    const fetchMasterData = async () => {
        try {
            const [g, s, l] = await Promise.all([
                api.groups.getAll(),
                api.shifts.getAll(),
                api.productionLines.getAll()
            ]);
            setGroups(g);
            setShifts(s);
            setLines(l);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        fetchData();
        fetchMasterData();
    }, [fetchData]);

    useEffect(() => {
        if (activeFilter === 'All') {
            setFilteredData(data);
        } else if (activeFilter === 'OK' || activeFilter === 'NOT OK') {
            setFilteredData(data.filter(item => item.quality === activeFilter));
        } else if (activeFilter === 'Today') {
            const today = new Date().toISOString().split('T')[0];
            setFilteredData(data.filter(item => item.date === today));
        } else {
            setFilteredData(data);
        }
    }, [activeFilter, data]);


    const handleCreate = async () => {
        if (!selectedGroup || !selectedShift || !selectedLine || !temperature || !weight) {
            Alert.alert("Validation", "Please fill all fields");
            return;
        }

        setIsSubmitting(true);
        try {
            const payload = {
                group_id: selectedGroup.id,
                shift_id: selectedShift.id,
                production_line_id: selectedLine.id,
                temperature: parseFloat(temperature),
                weight: parseFloat(weight),
                quality,
                input_method: inputMethod,
                date: new Date().toISOString().split('T')[0]    
            };

            await api.operations.create(payload);
            setModalVisible(false);
            resetForm();
            fetchData();
            Alert.alert("Success", "Operation recorded");
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Failed to record operation");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = (id: string | number) => {
        Alert.alert("Delete", "Remove this record?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Delete",
                style: "destructive",
                onPress: async () => {
                    try {
                        await api.operations.delete(id);
                        fetchData();
                    } catch (e) {
                        Alert.alert("Error", "Failed to delete");
                    }
                }
            }
        ]);
    };

    const resetForm = () => {
        setSelectedGroup(null);
        setSelectedShift(null);
        setSelectedLine(null);
        setTemperature('');
        setWeight('');
        setQuality('OK');
        setInputMethod('Manual');
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
                        <Text style={styles.modalTitle}>Record Operation</Text>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Ionicons name="close" size={24} color="#6B7280" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView contentContainerStyle={styles.formContainer}>
                        {/* Group Selection */}
                        <Text style={styles.label}>Group</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
                            {groups.map(g => (
                                <TouchableOpacity
                                    key={g.id}
                                    style={[styles.chip, selectedGroup?.id === g.id && styles.chipActive]}
                                    onPress={() => setSelectedGroup(g)}
                                >
                                    <Text style={[styles.chipText, selectedGroup?.id === g.id && styles.chipTextActive]}>{g.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        {/* Shift Selection */}
                        <Text style={styles.label}>Shift</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
                            {shifts.map(s => (
                                <TouchableOpacity
                                    key={s.id}
                                    style={[styles.chip, selectedShift?.id === s.id && styles.chipActive]}
                                    onPress={() => setSelectedShift(s)}
                                >
                                    <Text style={[styles.chipText, selectedShift?.id === s.id && styles.chipTextActive]}>{s.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        {/* Line Selection */}
                        <Text style={styles.label}>Production Line</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
                            {lines.map(l => (
                                <TouchableOpacity
                                    key={l.id}
                                    style={[styles.chip, selectedLine?.id === l.id && styles.chipActive]}
                                    onPress={() => setSelectedLine(l)}
                                >
                                    <Text style={[styles.chipText, selectedLine?.id === l.id && styles.chipTextActive]}>{l.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        {/* Values */}
                        <View style={styles.rowInputs}>
                            <View style={{ flex: 1, marginRight: 8 }}>
                                <Text style={styles.label}>Temperature (°C)</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="85.5"
                                    keyboardType="numeric"
                                    value={temperature}
                                    onChangeText={setTemperature}
                                />
                            </View>
                            <View style={{ flex: 1, marginLeft: 8 }}>
                                <Text style={styles.label}>Weight (Kg)</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="12.5"
                                    keyboardType="numeric"
                                    value={weight}
                                    onChangeText={setWeight}
                                />
                            </View>
                        </View>

                        {/* Quality */}
                        <Text style={styles.label}>Quality</Text>
                        <View style={styles.rowInputs}>
                            {['OK', 'NOT OK'].map(q => (
                                <TouchableOpacity
                                    key={q}
                                    style={[styles.qualityButton, quality === q && (q === 'OK' ? styles.qualityOk : styles.qualityNotOk)]}
                                    onPress={() => setQuality(q)}
                                >
                                    <Text style={[styles.qualityText, quality === q && { color: '#FFF' }]}>{q}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <TouchableOpacity
                            style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
                            onPress={handleCreate}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? <ActivityIndicator color="#FFF" /> : <Text style={styles.submitButtonText}>Submit Record</Text>}
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
                    <Text style={styles.headerTitle}>Operations</Text>
                    <Text style={styles.headerSubtitle}>Monitor daily production</Text>
                </View>
                <TouchableOpacity
                    style={styles.addButton}
                    activeOpacity={0.8}
                    onPress={() => {
                        fetchMasterData();  
                        resetForm();
                        setModalVisible(true);
                    }}
                >
                    <Ionicons name="add" size={24} color="#FFF" />
                </TouchableOpacity>
            </View>

            {/* Filter Slider (Horizontal Scroll) */}
            <View style={styles.filterContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterContent}>
                    {['All', 'Today', 'OK', 'NOT OK'].map((filter) => (
                        <TouchableOpacity
                            key={filter}
                            style={[styles.filterChip, activeFilter === filter && styles.activeFilterChip]}
                            onPress={() => setActiveFilter(filter)}
                        >
                            <Text style={[styles.filterText, activeFilter === filter && styles.activeFilterText]}>{filter}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* Main Content */}
            {isLoading ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#388E3C" />
                </View>
            ) : (
                <ScrollView style={styles.mainScrollView} horizontal={false} showsVerticalScrollIndicator={false}>
                    <View style={styles.tableContainer}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <View>
                                <View style={styles.tableHeader}>
                                    <Text style={[styles.headerCol, { width: 100 }]}>Date</Text>
                                    <Text style={[styles.headerCol, { width: 100 }]}>Line</Text>
                                    <Text style={[styles.headerCol, { width: 100 }]}>Shift</Text>
                                    <Text style={[styles.headerCol, { width: 100 }]}>Group</Text>
                                    <Text style={[styles.headerCol, { width: 120, textAlign: 'right' }]}>Values</Text>
                                    <Text style={[styles.headerCol, { width: 100, textAlign: 'center' }]}>Qual.</Text>
                                    <Text style={[styles.headerCol, { width: 50, textAlign: 'center' }]}>Act</Text>
                                </View>

                                {filteredData.map((item) => (
                                    <View key={item.id} style={styles.row}>
                                        <Text style={[styles.cellText, { width: 100, color: '#6B7280', fontSize: 13 }]}>
                                            {item.date ? new Date(item.date).toLocaleDateString() : '-'}
                                        </Text>

                                        <View style={{ width: 100 }}>
                                            <Text style={styles.cellTextPrimary}>{item.production_lines?.name || '-'}</Text>
                                        </View>

                                        <View style={{ width: 100 }}>
                                            <Text style={styles.cellText}>{item.shifts?.name || '-'}</Text>
                                        </View>

                                        <View style={{ width: 100 }}>
                                            <Text style={styles.cellText}>{item.groups?.name || '-'}</Text>
                                        </View>

                                        <View style={{ width: 120, alignItems: 'flex-end' }}>
                                            <Text style={[styles.cellText, { fontSize: 13 }]}>
                                                <Text style={{ color: '#9CA3AF' }}>T:</Text> {item.temperature}°c
                                            </Text>
                                            <Text style={[styles.cellText, { fontSize: 13 }]}>
                                                <Text style={{ color: '#9CA3AF' }}>W:</Text> {item.weight}kg
                                            </Text>
                                        </View>

                                        <View style={{ width: 100, alignItems: 'center' }}>
                                            {renderBadge(item.quality)}
                                        </View>

                                        <TouchableOpacity
                                            style={{ width: 50, alignItems: 'center' }}
                                            onPress={() => handleDelete(item.id)}
                                        >
                                            <Ionicons name="trash-outline" size={18} color="#EF4444" />
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </View>
                        </ScrollView>
                    </View>
                </ScrollView>
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
        paddingBottom: 12,
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
    filterContainer: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    filterContent: {
        paddingHorizontal: 24,
        gap: 12,
    },
    filterChip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#F3F4F6',
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    activeFilterChip: {
        backgroundColor: '#ECFDF5',
        borderColor: '#388E3C',
    },
    filterText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#6B7280',
    },
    activeFilterText: {
        color: '#388E3C',
        fontWeight: '600',
    },
    mainScrollView: {
        flex: 1,
    },
    tableContainer: {
        backgroundColor: '#FFFFFF',
        marginTop: 16,
        marginHorizontal: 0,    
    },
    tableHeader: {
        flexDirection: 'row',
        paddingHorizontal: 24,
        paddingVertical: 16,
        backgroundColor: '#F9FAFB',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    headerCol: {
        fontSize: 12,
        fontWeight: '600',
        color: '#6B7280',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    cellText: {
        fontSize: 14,
        color: '#4B5563',
    },
    cellTextPrimary: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1F2937',
    },
    badge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    badgeText: {
        fontSize: 11,
        fontWeight: '600',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
        maxHeight: '85%',
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
        marginTop: 16,
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
    },
    rowInputs: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    chipScroll: {
        flexGrow: 0,
        marginBottom: 8,
    },
    chip: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        marginRight: 10,
        backgroundColor: '#FFF',
    },
    chipActive: {
        backgroundColor: '#ECFDF5',
        borderColor: '#388E3C',
    },
    chipText: {
        fontSize: 14,
        color: '#4B5563',
    },
    chipTextActive: {
        color: '#388E3C',
        fontWeight: '600',
    },
    qualityButton: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        marginHorizontal: 4,
        backgroundColor: '#F3F4F6',
    },
    qualityOk: {
        backgroundColor: '#16A34A',
    },
    qualityNotOk: {
        backgroundColor: '#DC2626',
    },
    qualityText: {
        fontWeight: '600',
        color: '#4B5563',
    },
    submitButton: {
        backgroundColor: '#388E3C',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 32,
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
