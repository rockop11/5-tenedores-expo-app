import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Button } from '@rneui/themed'
import * as Location from "expo-location"
import MapView, { Marker } from 'react-native-maps'
import { Modal } from "../../../Shared"
import Toast from 'react-native-toast-message'
import { styles } from './MapForm.styles'

export function MapForm({ show, close, formik }) {

    const [location, setLocation] = useState({
        latitude: 0.001,
        lognitude: 0.001,
        latitudeDelta: 0.001,
        lognitudeDelta: 0.001,
    })

    const saveLocation = () => {
        formik.setFieldValue('location', location)
        close()
    }

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                Toast.show({
                    type: 'info',
                    position: 'bottom',
                    text1: 'Debes ir a ajustes y habilitar la ubicación',
                })
                return
            }

            const locationTemp = await Location.getCurrentPositionAsync({})
            setLocation({
                latitude: locationTemp.coords.latitude,
                lognitude: locationTemp.coords.longitude,
                latitudeDelta: "",
                lognitudeDelta: "",
            })
        })()
    }, [])

    return (
        <Modal show={show} close={close}>
            <MapView
                initialRegion={location}
                showsUserLocation={true}
                style={styles.mapStyle}
                onRegionChange={(locationTemp) => setLocation(locationTemp)}
            >
                <Marker draggable coordinate={location} />
            </MapView>

            <View style={styles.mapActions}>
                <Button
                    title="Guardar"
                    containerStyle={styles.btnMapContainerSave}
                    buttonStyle={styles.btnMapSave}
                    onPress={saveLocation}
                />

                <Button title="Cerrar"
                    containerStyle={styles.btnMapContainerCancel}
                    buttonStyle={styles.btnMapCancel}
                    onPress={close}
                />
            </View>
        </Modal>
    )
}