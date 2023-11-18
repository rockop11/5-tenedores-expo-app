import React, { useState } from 'react'
import * as ImagePicker from "expo-image-picker"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { Alert, ScrollView, View } from 'react-native'
import { LoadingModal } from '../../../Shared'
import { Icon, Avatar, Text } from '@rneui/themed'
import { v4 as uuidv4 } from 'uuid';
import { map, filter } from 'lodash'
import { styles } from "./UploadImageForm.styles"

export function UploadImageForm({ formik }) {

    const [isLoading, setIsLoading] = useState(false)

    const openGallery = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            })

            if (!result.canceled) {
                setIsLoading(true)
                uploadImage(result.assets[0].uri)
            }
        } catch (err) {
            console.log("ERROR OPEN GALLERY CATCH", JSON.stringify(err, null, 2))
        }

    }

    const uploadImage = async (uri) => {
        try {
            const response = await fetch(uri)
            const blob = await response.blob()

            const storage = getStorage()
            const storageRef = ref(storage, `restaurants/${uuidv4()}`)

            uploadBytes(storageRef, blob)
                .then((snapshot) => {
                    updatePhotosRestaurant(snapshot.metadata.fullPath)
                })
        } catch (err) {
            console.log("ERROR UPLOAD IMAGE CATCH", JSON.stringify(err, null, 2))
        }
    }

    const updatePhotosRestaurant = async (imagePath) => {
        try {
            const storage = getStorage()
            const imageRef = ref(storage, imagePath)

            const imageUrl = await getDownloadURL(imageRef)

            formik.setFieldValue('images', [...formik.values.images, imageUrl])

            setIsLoading(false)
        } catch (error) {
            console.log("ERROR UPDATE PHOTOS RST CATCH", JSON.stringify(err, null, 2))
        }
    }

    const removeImage = (img) => {
        Alert.alert(
            "Eliminar imagen",
            "¿Estás segurdo de eliminar esta imagen?",
            [
                {
                    text: "Cancelar",
                    style: "cancel",
                },
                {
                    text: "Eliminar",
                    onPress: () => {
                        const result = filter(
                            formik.values.images,
                            (image) => image !== img
                        );
                        formik.setFieldValue("images", result);
                    },
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <>
            <ScrollView
                style={styles.viewImage}
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                <Icon
                    type='material-community'
                    name='camera-outline'
                    color="#a7a7a7"
                    containerStyle={styles.containerIcon}
                    onPress={openGallery}
                />

                {
                    map(formik.values.images, (image) => (
                        <Avatar
                            key={image}
                            source={{ uri: image }}
                            containerStyle={styles.imageStyle}
                            onPress={() => removeImage(image)}
                        />
                    ))
                }
            </ScrollView>

            <Text style={styles.error}>{formik.errors.images}</Text>

            <LoadingModal show={isLoading} text="Subiendo imagen" />
        </>
    )
}