import React from 'react'
import { View } from 'react-native'
import { Image } from '@rneui/themed'
import { styles } from "./ImageRestaurant.styles"

export function ImageRestaurant({ formik }) {

  const primaryImage = formik.values.images[0]

  return (
    <View style={styles.content}>
      <Image
        source={primaryImage
          ? { uri: primaryImage }
          : require("../../../../../assets/img/not-found.png")}
        style={styles.image}
      />
    </View>
  )
}