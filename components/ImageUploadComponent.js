import { StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from 'expo-image-picker'
// import * as Progress from 'react-native-progress'

import { getStorage, ref, uploadBytesResumable, uploadBytes, getDownloadURL } from "firebase/storage";

// Components
import DefaultUserAvatarComponent from './DefaultUserAvatarComponent'
import DefaultEventBannerPlaceholderComponent from './DefaultEventBannerPlaceholderComponent';

// Constants
import  colors from '../constants/colors';
const WIDTH = Dimensions.get("screen").width - 40;

// Icons
import { MaterialIcons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';

const ImageUploadComponent = ({ onUpload, image='', isBanner=null }) => {

    const [uploading, setUploading] = React.useState(false)
    const [transferred, setTransferred] = React.useState(0)

    // Handlers
    const uploadImageAsync = async (imgUrl) => {
      try {
        const uri = imgUrl; //image;
        const filename = uri.substring(uri.lastIndexOf('/') + 1);
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

        setUploading(true);
        setTransferred(0);

        // Why are we using XMLHttpRequest? See:
        // https://github.com/expo/expo/issues/2402#issuecomment-443726662
        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function () {
            resolve(xhr.response);
          };
          xhr.onerror = function (e) {
            console.log("ERROR: ",e);
            reject(new TypeError("Network request failed"));
          };
          xhr.responseType = "blob";

          // xhr.open("GET", uri, true);
          xhr.open("GET", uploadUri, true);

          xhr.send(null);
        });
      
        // Create a root reference
        const storage = getStorage();
        const fileRef = ref( storage, filename );
        const result = await uploadBytes(fileRef, blob);

        // We're done with the blob, close and release it
        blob.close();

        const imageUri = await getDownloadURL(fileRef, result);
        console.log( "Uploader", imageUri )
        onUpload(imageUri)
        setUploading(false);
      }
      catch(e) {
        console.log(e)
      }
    }

    const pickImage = async () => {
      try {
        setUploading( prevValue => prevValue = true )
        // No permissions request is necessary for launching the image library
        let {assets, canceled} = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true, // false,
          aspect: [4, 3],
          quality: 1,
        });
      
        if (!canceled) {
          onUpload( prevValue => prevValue = assets[0].uri )
        }
        await uploadImageAsync(assets[0].uri ?? '');

        setUploading( prevValue => prevValue = false )
      }
      catch(e) {
        console.log(e);
        setUploading( prevValue => prevValue = false );
      }
    };

    return (
        <SafeAreaView style={styles.container}>

          <View style={styles.imageContainer}>
            {
              isBanner ?
                image ? (<Image source={{ uri: image }} style={styles.imageBox} />) : (<DefaultEventBannerPlaceholderComponent style={styles.imageBox} />)
              :
                image ? (<Image source={{ uri: image }} style={styles.imageBoxAlt} />) : (<DefaultUserAvatarComponent style={styles.imageBoxAlt} />)
            }
            {
              isBanner ?
                (<TouchableOpacity style={styles.selectButton} onPress={pickImage} disabled={uploading}>
                  <MaterialIcons name="file-upload" size={40} color={colors.white} />
                </TouchableOpacity>)
              :
                (<TouchableOpacity style={styles.selectButtonAlt} onPress={pickImage} disabled={uploading}>
                  <MaterialIcons name="edit" size={40} color={colors.white} />
                </TouchableOpacity>)
            }
          </View>
        </SafeAreaView>
    );
}

export default ImageUploadComponent

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // backgroundColor: '#bbded6'
  },
  selectButton: {
    borderRadius: 30,
    // width: WIDTH,
    width: 60,
    height: 60,
    backgroundColor: colors.primaryColor,// '#8ac6d1',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,

    elevation: 5
  },
  selectButtonAlt: {
    borderRadius: 35,
    width: 70,
    height: 70,
    backgroundColor: colors.primaryColor, // 'rgb(188, 197, 196)',
    alignItems: 'center',
    justifyContent: 'center',

    position: 'absolute',
    right: 10,
    bottom: 15,
    borderWidth: 6,
    borderColor: colors.bgColorDefault // colors.white
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  imageContainer: {
    alignItems: 'center',
    position:"relative"
  },
  progressBarContainer: {
    marginTop: 20
  },
  imageBoxAlt: {
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: colors.white
  },
  imageBox: {
    width: WIDTH,
    height: WIDTH * 0.6,
    borderRadius: 8,
    backgroundColor: colors.white,
    borderWidth: 4,
    borderColor: colors.white,

    // elevation: 5
  }
});