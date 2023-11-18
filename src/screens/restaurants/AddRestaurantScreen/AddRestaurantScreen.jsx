import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import { View, ScrollView } from 'react-native'
import { doc, setDoc } from "firebase/firestore"
import { db } from '../../../utils/firebase';
import { Button } from '@rneui/themed'
import { InfoForm, UploadImageForm, ImageRestaurant } from '../../../components/Restaurants/AddRestaurants'
import { useFormik } from 'formik'
import { useNavigation } from '@react-navigation/native';
import { initialValues, validationSchema } from './AddRestaurantScreen.data'
import { styles } from './AddRestaurantScreen.styles'

export function AddRestaurantScreen() {

  const navigation = useNavigation()

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      try {
        const newData = formValues
        newData.id = uuidv4()
        newData.createdAt = new Date()

        await setDoc(doc(db, "restaurants", newData.id), newData)

        navigation.goBack()
      } catch (error) {
        console.log(error)
      }
    }
  })

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ImageRestaurant formik={formik} />
      <InfoForm formik={formik} />

      <UploadImageForm formik={formik} />

      <Button
        title='Crear Restaurante'
        buttonStyle={styles.addRestaurant}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </ScrollView>
  )
}