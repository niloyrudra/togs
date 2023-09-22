import { StyleSheet, Text, View, Alert, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from 'expo-image-picker'
import * as Progress from 'react-native-progress'
// import storage from '@react-native-firebase/storage';
// import { firebase } from '@react-native-firebase/storage';

import { getStorage, ref, uploadBytesResumable, uploadBytes, getDownloadURL } from "firebase/storage";

// Firebase
// import  { app, firebase } from '../config/firebase.config'

import  colors from '../constants/colors'


const ImageUploadComponent = ({ onUpload, image='' }) => {

    // const [image, setImage] = React.useState(null)
    // const [imageList, setImageList] = React.useState([])
    const [uploading, setUploading] = React.useState(false)
    const [transferred, setTransferred] = React.useState(0)

    // Handlers
    // const selectImage = () => {
        // const options = {
        //     maxWidth: 2000,
        //     maxHeight: 2000,
        //     storageOptions: {
        //         skipBackup: true,
        //         path: 'images'
        //     }
        // };

        // // ImagePicker.showImagePicker(options, response => {
        //     if (response.didCancel) {
        //         console.log('User cancelled image picker');
        //     } else if (response.error) {
        //         console.log('ImagePicker Error: ', response.error);
        //     } else if (response.customButton) {
        //         console.log('User tapped custom button: ', response.customButton);
        //     } else {
        //         console.log(response);
        //         const source = { uri: response?.uri };
        //         setImage(source);
        //     }
        // });
    // };
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let {assets, canceled} = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: false, // true,
          aspect: [4, 3],
          quality: 1,
          // allowsMultipleSelection: true
        });
    
        // console.log(assets[0].uri);
        // console.log(assets.length, assets);
    
        if (!canceled) {
          // setImage(assets[0].uri)
          onUpload(assets[0].uri)
          // if( assets.length > 0 ) {
          //   assets.forEach( imageData => {
          //     const data = [...image, imageData.uri]
          //     setImage( data );
          //   } )
          // }else {
          //   setImage( [imageData.uri] );
          // }
        }
    };

    const uploadImageAsync = async () => {
        // const { uri } = image;
        // console.log(image)
        // return
        // const uri = image.at(0);

        const uri = image;
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

        // result.on('state-changed', (snapshot) => {console.log('state-changed action', snapshot)})

        // We're done with the blob, close and release it
        blob.close();

        // uploadTask.on('state_changed', 
        //     (snapshot) => {
        //         // Observe state change events such as progress, pause, and resume
        //         // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        //         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //         console.log('Upload is ' + progress + '% done');
                
        //         setTransferred( prevValue => prevValue = progress );

        //         switch (snapshot.state) {
        //             case 'paused':
        //                 console.log('Upload is paused');
        //                 break;
        //             case 'running':
        //                 console.log('Upload is running');
        //                 break;
        //         }
        //     },
        //     (error) => {
        //         // Handle unsuccessful uploads
        //         console.log("Upload Error >> ", error)
        //     },
        //     () => {
        //         // Handle successful uploads on complete
        //         // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        //         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        //             console.log('File available at', downloadURL);
        //             onUpload(downloadURL)
        //         });
        //     }
        // );

        const imageUri = await getDownloadURL(fileRef, result);
        onUpload(imageUri)
        // setImage(null)
        setUploading(false);
    }

    return (
        <SafeAreaView style={styles.container}>
          <TouchableOpacity style={styles.selectButton} onPress={pickImage}>
            <Text style={styles.buttonText}>Pick an image</Text>
          </TouchableOpacity>
          <View style={styles.imageContainer}>
            {image && (<Image source={{ uri: image }} style={styles.imageBox} />)}
            { uploading ? (
              <View style={styles.progressBarContainer}>
                {/* <Progress.Bar progress={transferred} width={300} /> */}
                <ActivityIndicator size='large' color={ colors.primaryColor } />
              </View>
            ) : (
              <TouchableOpacity style={styles.uploadButton} onPress={uploadImageAsync}>
                <Text style={styles.buttonText}>Upload image</Text>
              </TouchableOpacity>
            )}
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
    borderRadius: 5,
    width: 150,
    height: 50,
    backgroundColor: '#8ac6d1',
    alignItems: 'center',
    justifyContent: 'center'
  },
  uploadButton: {
    borderRadius: 5,
    width: 150,
    height: 50,
    backgroundColor: '#ffb6b9',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  imageContainer: {
    marginTop: 30,
    marginBottom: 50,
    alignItems: 'center'
  },
  progressBarContainer: {
    marginTop: 20
  },
  imageBox: {
    width: 300,
    height: 300,
    backgroundColor: colors.white
  }
});