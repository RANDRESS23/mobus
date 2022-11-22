import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, LogBox } from 'react-native' // eslint-disable-line
import ItemBusetas from './ItemBusetas'
import { database } from '../../services/database/Firebase'
import { collection, addDoc, onSnapshot, orderBy, query, doc, deleteDoc, updateDoc } from 'firebase/firestore' // eslint-disable-line
import GetBusetas from '../../services/GetBusetas'

LogBox.ignoreLogs(['Setting a timer'])

const COLORS = {
  firstColor: {
    primaryColor: '#7900AC',
    secondaryColor: '#F0F2F6'
  },
  secondColor: {
    primaryColor: '#4930AF',
    secondaryColor: '#A6A1D7'
  }
}

export default function BusetasCardsContainer (
  { isSectionVereda, navigation, setRutaSelected, isViewResetHistory, setIsViewResetHistory, setLoading }) {
  const [busetas, setBusetas] = useState([ // eslint-disable-line
    {
      nameRuta: 'Cañaveral ⇄ Clarita Botero',
      numRuta: '2',
      horarioServicio: '5:20 a.m. - 8:48 p.m.',
      paradasRuta: [
        {
          numParada: '1',
          nameParada: 'Terminal cañaveral parte alta',
          coordinates: {
            latitude: 4.451946,
            longitude: -75.186958
          },
          horariosParada: ['5:20 a.m.', '5:36 a.m.', '5:52 a.m.', '6:08 a.m.', '6:24 a.m.', '6:40 a.m.', '6:56 a.m.', '7:12 a.m.', '7:28 a.m.', '7:44 a.m.', '8:00 a.m.', '8:16 a.m.', '8:32 a.m.', '8:48 a.m.', '9:04 a.m.', '9:20 a.m.', '9:36 a.m.', '9:52 a.m.', '10:08 a.m.', '10:24 a.m.', '10:40 a.m.', '10:56 a.m.', '11:12 a.m.', '11:28 a.m.', '11:44 a.m.', '12:00 p.m.', '12:16 p.m.', '12:32 p.m.', '12:48 p.m.', '1:04 p.m.', '1:20 p.m.', '1:36 p.m.', '1:52 p.m.', '2:08 p.m.', '2:24 p.m.', '2:40 p.m.', '2:56 p.m.', '3:12 p.m.', '3:28 p.m.', '3:44 p.m.', '4:00 p.m.', '4:16 p.m.', '4:32 p.m.', '4:48 p.m.', '5:04 p.m.', '5:20 p.m.', '5:36 p.m.', '5:52 p.m.', '6:08 p.m.', '6:24 p.m.', '6:40 p.m.', '6:56 p.m.', '7:12 p.m.', '7:28 p.m.', '7:44 p.m.', '8:00 p.m.', '8:16 p.m.', '8:32 p.m.', '8:48 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B01%2FP1_IMG1.PNG?alt=media&token=7ad1b227-e2b4-4e44-b584-8c6985173754' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B01%2FP1_IMG2.PNG?alt=media&token=89bed40d-a42d-45fd-bcea-aa782fe7d477' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B01%2FP1_IMG3.PNG?alt=media&token=457808a1-2d13-406d-8cef-0701f6cec90b' }
          ]
        },
        {
          numParada: '2',
          nameParada: 'Cañaveral',
          coordinates: {
            latitude: 4.451302,
            longitude: -75.186081
          },
          horariosParada: ['5:20 a.m.', '5:36 a.m.', '5:52 a.m.', '6:08 a.m.', '6:24 a.m.', '6:40 a.m.', '6:56 a.m.', '7:12 a.m.', '7:28 a.m.', '7:44 a.m.', '8:00 a.m.', '8:16 a.m.', '8:32 a.m.', '8:48 a.m.', '9:04 a.m.', '9:20 a.m.', '9:36 a.m.', '9:52 a.m.', '10:08 a.m.', '10:24 a.m.', '10:40 a.m.', '10:56 a.m.', '11:12 a.m.', '11:28 a.m.', '11:44 a.m.', '12:00 p.m.', '12:16 p.m.', '12:32 p.m.', '12:48 p.m.', '1:04 p.m.', '1:20 p.m.', '1:36 p.m.', '1:52 p.m.', '2:08 p.m.', '2:24 p.m.', '2:40 p.m.', '2:56 p.m.', '3:12 p.m.', '3:28 p.m.', '3:44 p.m.', '4:00 p.m.', '4:16 p.m.', '4:32 p.m.', '4:48 p.m.', '5:04 p.m.', '5:20 p.m.', '5:36 p.m.', '5:52 p.m.', '6:08 p.m.', '6:24 p.m.', '6:40 p.m.', '6:56 p.m.', '7:12 p.m.', '7:28 p.m.', '7:44 p.m.', '8:00 p.m.', '8:16 p.m.', '8:32 p.m.', '8:48 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B02%2FP2_IMG1.PNG?alt=media&token=ca0a7f2f-3131-4c2b-9530-dcc75c5d65ae' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B02%2FP2_IMG2.PNG?alt=media&token=9db6880e-fd13-47eb-ae78-23ea7c83e32a' }
          ]
        },
        {
          numParada: '3',
          nameParada: 'Br. Cañaveral',
          coordinates: {
            latitude: 4.450055,
            longitude: -75.185207
          },
          horariosParada: ['5:20 a.m.', '5:36 a.m.', '5:52 a.m.', '6:08 a.m.', '6:24 a.m.', '6:40 a.m.', '6:56 a.m.', '7:12 a.m.', '7:28 a.m.', '7:44 a.m.', '8:00 a.m.', '8:16 a.m.', '8:32 a.m.', '8:48 a.m.', '9:04 a.m.', '9:20 a.m.', '9:36 a.m.', '9:52 a.m.', '10:08 a.m.', '10:24 a.m.', '10:40 a.m.', '10:56 a.m.', '11:12 a.m.', '11:28 a.m.', '11:44 a.m.', '12:00 p.m.', '12:16 p.m.', '12:32 p.m.', '12:48 p.m.', '1:04 p.m.', '1:20 p.m.', '1:36 p.m.', '1:52 p.m.', '2:08 p.m.', '2:24 p.m.', '2:40 p.m.', '2:56 p.m.', '3:12 p.m.', '3:28 p.m.', '3:44 p.m.', '4:00 p.m.', '4:16 p.m.', '4:32 p.m.', '4:48 p.m.', '5:04 p.m.', '5:20 p.m.', '5:36 p.m.', '5:52 p.m.', '6:08 p.m.', '6:24 p.m.', '6:40 p.m.', '6:56 p.m.', '7:12 p.m.', '7:28 p.m.', '7:44 p.m.', '8:00 p.m.', '8:16 p.m.', '8:32 p.m.', '8:48 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B03%2FP3_IMG1.PNG?alt=media&token=3f25a84d-3328-4c17-8150-28b766f3c9e1' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B03%2FP3_IMG2.PNG?alt=media&token=c6c837f9-fe13-4a28-af13-10317f3305f6' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B03%2FP3_IMG3.PNG?alt=media&token=bb0f39ec-38ee-4318-930c-657df915e976' }
          ]
        },
        {
          numParada: '4',
          nameParada: 'Br. Cañaveral',
          coordinates: {
            latitude: 4.447903,
            longitude: -75.183422
          },
          horariosParada: ['5:21 a.m.', '5:37 a.m.', '5:53 a.m.', '6:09 a.m.', '6:25 a.m.', '6:41 a.m.', '6:57 a.m.', '7:14 a.m.', '7:30 a.m.', '7:46 a.m.', '8:02 a.m.', '8:18 a.m.', '8:34 a.m.', '8:50 a.m.', '9:06 a.m.', '9:22 a.m.', '9:38 a.m.', '9:54 a.m.', '10:09 a.m.', '10:25 a.m.', '10:41 a.m.', '10:57 a.m.', '11:13 a.m.', '11:29 a.m.', '11:45 a.m.', '12:01 p.m.', '12:17 p.m.', '12:33 p.m.', '12:49 p.m.', '1:05 p.m.', '1:21 p.m.', '1:37 p.m.', '1:53 p.m.', '2:09 p.m.', '2:25 p.m.', '2:41 p.m.', '2:57 p.m.', '3:14 p.m.', '3:30 p.m.', '3:46 p.m.', '4:02 p.m.', '4:18 p.m.', '4:34 p.m.', '4:50 p.m.', '5:06 p.m.', '5:22 p.m.', '5:38 p.m.', '5:54 p.m.', '6:10 p.m.', '6:26 p.m.', '6:42 p.m.', '6:58 p.m.', '7:14 p.m.', '7:30 p.m.', '7:46 p.m.', '8:01 p.m.', '8:17 p.m.', '8:33 p.m.', '8:49 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B04%2FP4_IMG1.PNG?alt=media&token=0137045f-2131-445a-afe8-3c200a27d3a9' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B04%2FP4_IMG2.PNG?alt=media&token=829e0b6d-697b-4c72-b29f-11b328bcbcbd' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B04%2FP4_IMG3.PNG?alt=media&token=d885dbf8-9fc0-42d5-b051-5b3bfa751cdc' }
          ]
        },
        {
          numParada: '5',
          nameParada: 'Av Ambalá Pp',
          coordinates: {
            latitude: 4.446716,
            longitude: -75.183474
          },
          horariosParada: ['5:21 a.m.', '5:37 a.m.', '5:53 a.m.', '6:09 a.m.', '6:25 a.m.', '6:41 a.m.', '6:57 a.m.', '7:14 a.m.', '7:30 a.m.', '7:46 a.m.', '8:02 a.m.', '8:18 a.m.', '8:34 a.m.', '8:50 a.m.', '9:06 a.m.', '9:22 a.m.', '9:38 a.m.', '9:54 a.m.', '10:09 a.m.', '10:25 a.m.', '10:41 a.m.', '10:57 a.m.', '11:13 a.m.', '11:29 a.m.', '11:45 a.m.', '12:01 p.m.', '12:17 p.m.', '12:33 p.m.', '12:49 p.m.', '1:05 p.m.', '1:21 p.m.', '1:37 p.m.', '1:53 p.m.', '2:09 p.m.', '2:25 p.m.', '2:41 p.m.', '2:57 p.m.', '3:14 p.m.', '3:30 p.m.', '3:46 p.m.', '4:02 p.m.', '4:18 p.m.', '4:34 p.m.', '4:50 p.m.', '5:06 p.m.', '5:22 p.m.', '5:38 p.m.', '5:54 p.m.', '6:10 p.m.', '6:26 p.m.', '6:42 p.m.', '6:58 p.m.', '7:14 p.m.', '7:30 p.m.', '7:46 p.m.', '8:01 p.m.', '8:17 p.m.', '8:33 p.m.', '8:49 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B05%2FP5_IMG1.PNG?alt=media&token=67cb86b2-4f98-4910-a92a-1d2965c953d3' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B05%2FP5_IMG2.PNG?alt=media&token=137ba345-c1f9-4ecf-986c-913df7354018' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B05%2FP5_IMG3.PNG?alt=media&token=a0bc9ee9-c251-4ed7-a231-dd93fb932f22' }
          ]
        },
        {
          numParada: '6',
          nameParada: 'Calleja Del Vergel',
          coordinates: {
            latitude: 4.446464,
            longitude: -75.185284
          },
          horariosParada: ['5:22 a.m.', '5:38 a.m.', '5:54 a.m.', '6:10 a.m.', '6:26 a.m.', '6:42 a.m.', '6:58 a.m.', '7:15 a.m.', '7:31 a.m.', '7:47 a.m.', '8:03 a.m.', '8:19 a.m.', '8:35 a.m.', '8:51 a.m.', '9:07 a.m.', '9:23 a.m.', '9:39 a.m.', '9:55 a.m.', '10:10 a.m.', '10:26 a.m.', '10:42 a.m.', '10:58 a.m.', '11:14 a.m.', '11:30 a.m.', '11:46 a.m.', '12:02 p.m.', '12:18 p.m.', '12:34 p.m.', '12:50 p.m.', '1:06 p.m.', '1:22 p.m.', '1:38 p.m.', '1:54 p.m.', '2:10 p.m.', '2:26 p.m.', '2:42 p.m.', '2:58 p.m.', '3:15 p.m.', '3:31 p.m.', '3:47 p.m.', '4:03 p.m.', '4:19 p.m.', '4:35 p.m.', '4:51 p.m.', '5:07 p.m.', '5:23 p.m.', '5:39 p.m.', '5:55 p.m.', '6:11 p.m.', '6:27 p.m.', '6:43 p.m.', '6:59 p.m.', '7:15 p.m.', '7:31 p.m.', '7:47 p.m.', '8:02 p.m.', '8:18 p.m.', '8:34 p.m.', '8:50 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B06%2FP6_IMG1.PNG?alt=media&token=bcab0d09-7183-48f6-89dc-21416172578e' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B06%2FP6_IMG2.PNG?alt=media&token=f36f5325-db32-4972-99da-a346bbddf769' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B06%2FP6_IMG3.PNG?alt=media&token=6aab37e3-379a-47b5-b7cb-a13af1f4462e' }
          ]
        },
        {
          numParada: '7',
          nameParada: 'Av. Ambalá X Cll. 80',
          coordinates: {
            latitude: 4.446728,
            longitude: -75.187903
          },
          horariosParada: ['5:23 a.m.', '5:39 a.m.', '5:55 a.m.', '6:11 a.m.', '6:27 a.m.', '6:43 a.m.', '6:59 a.m.', '7:16 a.m.', '7:32 a.m.', '7:48 a.m.', '8:04 a.m.', '8:20 a.m.', '8:36 a.m.', '8:52 a.m.', '9:08 a.m.', '9:24 a.m.', '9:40 a.m.', '9:56 a.m.', '10:11 a.m.', '10:27 a.m.', '10:43 a.m.', '10:59 a.m.', '11:15 a.m.', '11:31 a.m.', '11:47 a.m.', '12:03 p.m.', '12:19 p.m.', '12:35 p.m.', '12:51 p.m.', '1:07 p.m.', '1:23 p.m.', '1:39 p.m.', '1:55 p.m.', '2:11 p.m.', '2:27 p.m.', '2:43 p.m.', '2:59 p.m.', '3:16 p.m.', '3:32 p.m.', '3:48 p.m.', '4:04 p.m.', '4:20 p.m.', '4:36 p.m.', '4:52 p.m.', '5:08 p.m.', '5:24 p.m.', '5:40 p.m.', '5:56 p.m.', '6:12 p.m.', '6:28 p.m.', '6:44 p.m.', '7:00 p.m.', '7:16 p.m.', '7:32 p.m.', '7:48 p.m.', '8:03 p.m.', '8:19 p.m.', '8:35 p.m.', '8:51 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B07%2FP7_IMG1.PNG?alt=media&token=8832fa9f-c9fb-413e-927a-16ae162d15d8' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B07%2FP7_IMG2.PNG?alt=media&token=065e5004-cf8b-4211-b906-89232b091478' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B07%2FP7_IMG3.PNG?alt=media&token=bc2a031a-ab40-4cf5-aad0-49e76b2e9f78' }
          ]
        },
        {
          numParada: '8',
          nameParada: 'Call. 77 X Cra. 11',
          coordinates: {
            latitude: 4.445032,
            longitude: -75.191150
          },
          horariosParada: ['5:24 a.m.', '5:40 a.m.', '5:56 a.m.', '6:12 a.m.', '6:28 a.m.', '6:44 a.m.', '7:00 a.m.', '7:17 a.m.', '7:33 a.m.', '7:49 a.m.', '8:05 a.m.', '8:21 a.m.', '8:37 a.m.', '8:53 a.m.', '9:09 a.m.', '9:25 a.m.', '9:41 a.m.', '9:57 a.m.', '10:12 a.m.', '10:28 a.m.', '10:44 a.m.', '11:00 a.m.', '11:16 a.m.', '11:32 a.m.', '11:48 a.m.', '12:04 p.m.', '12:20 p.m.', '12:36 p.m.', '12:52 p.m.', '1:08 p.m.', '1:24 p.m.', '1:40 p.m.', '1:56 p.m.', '2:12 p.m.', '2:28 p.m.', '2:44 p.m.', '3:00 p.m.', '3:17 p.m.', '3:33 p.m.', '3:49 p.m.', '4:05 p.m.', '4:21 p.m.', '4:37 p.m.', '4:53 p.m.', '5:09 p.m.', '5:25 p.m.', '5:41 p.m.', '5:57 p.m.', '6:13 p.m.', '6:29 p.m.', '6:45 p.m.', '7:01 p.m.', '7:17 p.m.', '7:33 p.m.', '7:49 p.m.', '8:04 p.m.', '8:20 p.m.', '8:36 p.m.', '8:52 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B08%2FP8_IMG1.PNG?alt=media&token=b89e9750-b1fa-4ff8-a773-fbb6bc877559' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B08%2FP8_IMG2.PNG?alt=media&token=adaf79b1-cbd6-475f-b6d3-bcac9ba57b15' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B08%2FP8_IMG3.PNG?alt=media&token=485f08e9-7b74-4c61-8bac-aafcd157312f' }
          ]
        },
        {
          numParada: '9',
          nameParada: 'Call. 77 X Cra. 10',
          coordinates: {
            latitude: 4.443073,
            longitude: -75.191935
          },
          horariosParada: ['5:24 a.m.', '5:40 a.m.', '5:56 a.m.', '6:12 a.m.', '6:28 a.m.', '6:44 a.m.', '7:01 a.m.', '7:18 a.m.', '7:34 a.m.', '7:50 a.m.', '8:06 a.m.', '8:22 a.m.', '8:38 a.m.', '8:54 a.m.', '9:10 a.m.', '9:26 a.m.', '9:42 a.m.', '9:58 a.m.', '10:13 a.m.', '10:29 a.m.', '10:45 a.m.', '11:01 a.m.', '11:17 a.m.', '11:33 a.m.', '11:49 a.m.', '12:05 p.m.', '12:21 p.m.', '12:37 p.m.', '12:53 p.m.', '1:09 p.m.', '1:25 p.m.', '1:41 p.m.', '1:57 p.m.', '2:13 p.m.', '2:29 p.m.', '2:45 p.m.', '3:01 p.m.', '3:18 p.m.', '3:34 p.m.', '3:50 p.m.', '4:06 p.m.', '4:22 p.m.', '4:38 p.m.', '4:54 p.m.', '5:10 p.m.', '5:26 p.m.', '5:42 p.m.', '5:58 p.m.', '6:14 p.m.', '6:30 p.m.', '6:46 p.m.', '7:02 p.m.', '7:18 p.m.', '7:34 p.m.', '7:50 p.m.', '8:04 p.m.', '8:20 p.m.', '8:36 p.m.', '8:52 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B09%2FP9_IMG1.PNG?alt=media&token=0559b9a0-6140-4614-8d01-d89c22180b0a' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B09%2FP9_IMG2.PNG?alt=media&token=7064795f-4cdd-4e5e-9458-d648602d7235' }
          ]
        },
        {
          numParada: '10',
          nameParada: 'Usi',
          coordinates: {
            latitude: 4.442418,
            longitude: -75.195603
          },
          horariosParada: ['5:25 a.m.', '5:41 a.m.', '5:57 a.m.', '6:13 a.m.', '6:29 a.m.', '6:45 a.m.', '7:02 a.m.', '7:19 a.m.', '7:35 a.m.', '7:51 a.m.', '8:07 a.m.', '8:23 a.m.', '8:39 a.m.', '8:55 a.m.', '9:11 a.m.', '9:27 a.m.', '9:43 a.m.', '9:59 a.m.', '10:14 a.m.', '10:30 a.m.', '10:46 a.m.', '11:02 a.m.', '11:18 a.m.', '11:34 a.m.', '11:50 a.m.', '12:06 p.m.', '12:22 p.m.', '12:38 p.m.', '12:54 p.m.', '1:10 p.m.', '1:26 p.m.', '1:42 p.m.', '1:58 p.m.', '2:14 p.m.', '2:30 p.m.', '2:46 p.m.', '3:02 p.m.', '3:19 p.m.', '3:35 p.m.', '3:51 p.m.', '4:07 p.m.', '4:23 p.m.', '4:39 p.m.', '4:55 p.m.', '5:11 p.m.', '5:27 p.m.', '5:43 p.m.', '5:59 p.m.', '6:15 p.m.', '6:31 p.m.', '6:47 p.m.', '7:03 p.m.', '7:19 p.m.', '7:35 p.m.', '7:51 p.m.', '8:05 p.m.', '8:21 p.m.', '8:37 p.m.', '8:53 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B010%2FP10_IMG1.PNG?alt=media&token=96b741b4-dc95-4020-9f35-f45335a8cace' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B010%2FP10_IMG2.PNG?alt=media&token=4fc2aed0-771a-4bf6-8a40-68cce14e6a89' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B010%2FP10_IMG3.PNG?alt=media&token=9e2559ff-ac7c-4189-b02e-55eecf5b2556' }
          ]
        },
        {
          numParada: '11',
          nameParada: 'Colegio Niño De Jesús De Praga',
          coordinates: {
            latitude: 4.442268,
            longitude: -75.198851
          },
          horariosParada: ['5:26 a.m.', '5:42 a.m.', '5:58 a.m.', '6:14 a.m.', '6:30 a.m.', '6:46 a.m.', '7:03 a.m.', '7:20 a.m.', '7:36 a.m.', '7:52 a.m.', '8:08 a.m.', '8:24 a.m.', '8:40 a.m.', '8:56 a.m.', '9:12 a.m.', '9:28 a.m.', '9:44 a.m.', '10:00 a.m.', '10:15 a.m.', '10:31 a.m.', '10:47 a.m.', '11:03 a.m.', '11:19 a.m.', '11:35 a.m.', '11:51 a.m.', '12:07 p.m.', '12:23 p.m.', '12:39 p.m.', '12:55 p.m.', '1:11 p.m.', '1:27 p.m.', '1:43 p.m.', '1:59 p.m.', '2:15 p.m.', '2:31 p.m.', '2:47 p.m.', '3:03 p.m.', '3:20 p.m.', '3:36 p.m.', '3:52 p.m.', '4:08 p.m.', '4:24 p.m.', '4:40 p.m.', '4:56 p.m.', '5:12 p.m.', '5:28 p.m.', '5:44 p.m.', '6:00 p.m.', '6:16 p.m.', '6:32 p.m.', '6:48 p.m.', '7:04 p.m.', '7:20 p.m.', '7:36 p.m.', '7:52 p.m.', '8:06 p.m.', '8:22 p.m.', '8:38 p.m.', '8:54 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B011%2FP11_IMG1.PNG?alt=media&token=cb5f4c44-9ed7-488a-a12e-bd4afedb2ad0' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B011%2FP11_IMG2.PNG?alt=media&token=10038895-7bed-4f50-868b-ff4c88f2b260' }
          ]
        },
        {
          numParada: '12',
          nameParada: 'Cll. 64 X Cra. 9',
          coordinates: {
            latitude: 4.441804,
            longitude: -75.202047
          },
          horariosParada: ['5:27 a.m.', '5:43 a.m.', '5:59 a.m.', '6:15 a.m.', '6:31 a.m.', '6:47 a.m.', '7:04 a.m.', '7:21 a.m.', '7:37 a.m.', '7:53 a.m.', '8:09 a.m.', '8:25 a.m.', '8:41 a.m.', '8:57 a.m.', '9:13 a.m.', '9:29 a.m.', '9:45 a.m.', '10:01 a.m.', '10:16 a.m.', '10:32 a.m.', '10:48 a.m.', '11:04 a.m.', '11:20 a.m.', '11:36 a.m.', '11:52 a.m.', '12:08 p.m.', '12:24 p.m.', '12:40 p.m.', '12:56 p.m.', '1:12 p.m.', '1:28 p.m.', '1:44 p.m.', '2:00 p.m.', '2:16 p.m.', '2:32 p.m.', '2:48 p.m.', '3:04 p.m.', '3:21 p.m.', '3:37 p.m.', '3:53 p.m.', '4:09 p.m.', '4:25 p.m.', '4:41 p.m.', '4:57 p.m.', '5:13 p.m.', '5:29 p.m.', '5:45 p.m.', '6:01 p.m.', '6:17 p.m.', '6:33 p.m.', '6:49 p.m.', '7:05 p.m.', '7:21 p.m.', '7:37 p.m.', '7:53 p.m.', '8:07 p.m.', '8:23 p.m.', '8:39 p.m.', '8:55 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B012%2FP12_IMG1.PNG?alt=media&token=b65ecbe5-323b-4cce-932d-7e70671c9458' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B012%2FP12_IMG2.PNG?alt=media&token=cd1c3554-cd4d-414e-b597-a11b5883bd52' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B012%2FP12_IMG3.PNG?alt=media&token=11f37899-ed26-4f91-ab74-3d1ff6f0589c' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B012%2FP12_IMG4.PNG?alt=media&token=55786159-b75a-4963-8366-b007b809373c' }
          ]
        },
        {
          numParada: '13',
          nameParada: 'Cra. 8 X Cll. 64',
          coordinates: {
            latitude: 4.439985,
            longitude: -75.201607
          },
          horariosParada: ['5:28 a.m.', '5:44 a.m.', '6:00 a.m.', '6:16 a.m.', '6:32 a.m.', '6:48 a.m.', '7:05 a.m.', '7:22 a.m.', '7:38 a.m.', '7:54 a.m.', '8:10 a.m.', '8:26 a.m.', '8:42 a.m.', '8:58 a.m.', '9:14 a.m.', '9:30 a.m.', '9:46 a.m.', '10:02 a.m.', '10:17 a.m.', '10:33 a.m.', '10:49 a.m.', '11:05 a.m.', '11:21 a.m.', '11:37 a.m.', '11:53 a.m.', '12:09 p.m.', '12:25 p.m.', '12:41 p.m.', '12:57 p.m.', '1:13 p.m.', '1:29 p.m.', '1:45 p.m.', '2:01 p.m.', '2:17 p.m.', '2:33 p.m.', '2:49 p.m.', '3:05 p.m.', '3:22 p.m.', '3:38 p.m.', '3:54 p.m.', '4:10 p.m.', '4:26 p.m.', '4:42 p.m.', '4:58 p.m.', '5:14 p.m.', '5:30 p.m.', '5:46 p.m.', '6:02 p.m.', '6:18 p.m.', '6:34 p.m.', '6:50 p.m.', '7:06 p.m.', '7:22 p.m.', '7:38 p.m.', '7:54 p.m.', '8:08 p.m.', '8:24 p.m.', '8:40 p.m.', '8:56 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B013%2FP13_IMG1.PNG?alt=media&token=edac5121-7cd1-4abc-8a07-169fee8eeab1' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B013%2FP13_IMG2.PNG?alt=media&token=a18ee79e-00b4-4eb5-8112-61f5be83e114' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B013%2FP13_IMG3.PNG?alt=media&token=8d64b7c4-bad0-45da-bb35-94723b1df362' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B013%2FP13_IMG4.PNG?alt=media&token=2148a28a-bbfc-42e1-a027-3c4f08290719' }
          ]
        },
        {
          numParada: '14',
          nameParada: 'Centro Comercial Multicentro',
          coordinates: {
            latitude: 4.436665,
            longitude: -75.200504
          },
          horariosParada: ['5:29 a.m.', '5:45 a.m.', '6:01 a.m.', '6:17 a.m.', '6:33 a.m.', '6:49 a.m.', '7:06 a.m.', '7:23 a.m.', '7:39 a.m.', '7:55 a.m.', '8:11 a.m.', '8:27 a.m.', '8:43 a.m.', '8:59 a.m.', '9:15 a.m.', '9:31 a.m.', '9:47 a.m.', '10:03 a.m.', '10:18 a.m.', '10:34 a.m.', '10:50 a.m.', '11:06 a.m.', '11:22 a.m.', '11:38 a.m.', '11:54 a.m.', '12:10 p.m.', '12:26 p.m.', '12:42 p.m.', '12:58 p.m.', '1:14 p.m.', '1:30 p.m.', '1:46 p.m.', '2:02 p.m.', '2:18 p.m.', '2:34 p.m.', '2:50 p.m.', '3:06 p.m.', '3:23 p.m.', '3:39 p.m.', '3:55 p.m.', '4:11 p.m.', '4:27 p.m.', '4:43 p.m.', '4:59 p.m.', '5:15 p.m.', '5:31 p.m.', '5:47 p.m.', '6:03 p.m.', '6:19 p.m.', '6:35 p.m.', '6:51 p.m.', '7:07 p.m.', '7:23 p.m.', '7:39 p.m.', '7:55 p.m.', '8:09 p.m.', '8:25 p.m.', '8:41 p.m.', '8:57 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B014%2FP14_IMG1.PNG?alt=media&token=0c9d87cd-22fc-4bdc-af39-bcc811781109' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B014%2FP14_IMG2.PNG?alt=media&token=cd521133-543b-499a-9fb1-f4e128a76c4c' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B014%2FP14_IMG3.PNG?alt=media&token=0faf0c2a-6f76-4e06-a5d6-2f72e16d9a2d' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B014%2FP14_IMG4.PNG?alt=media&token=a324d544-9e6b-447f-a44c-10388ec7a30b' }
          ]
        },
        {
          numParada: '15',
          nameParada: 'Multicentro (Cra. 5 X Cll. 61a)',
          coordinates: {
            latitude: 4.436315,
            longitude: -75.201690
          },
          horariosParada: ['5:29 a.m.', '5:45 a.m.', '6:01 a.m.', '6:17 a.m.', '6:33 a.m.', '6:49 a.m.', '7:06 a.m.', '7:23 a.m.', '7:39 a.m.', '7:55 a.m.', '8:11 a.m.', '8:27 a.m.', '8:43 a.m.', '8:59 a.m.', '9:15 a.m.', '9:31 a.m.', '9:47 a.m.', '10:03 a.m.', '10:18 a.m.', '10:34 a.m.', '10:50 a.m.', '11:06 a.m.', '11:22 a.m.', '11:38 a.m.', '11:54 a.m.', '12:10 p.m.', '12:26 p.m.', '12:42 p.m.', '12:58 p.m.', '1:14 p.m.', '1:30 p.m.', '1:46 p.m.', '2:02 p.m.', '2:18 p.m.', '2:34 p.m.', '2:50 p.m.', '3:06 p.m.', '3:23 p.m.', '3:39 p.m.', '3:55 p.m.', '4:11 p.m.', '4:27 p.m.', '4:43 p.m.', '4:59 p.m.', '5:15 p.m.', '5:31 p.m.', '5:47 p.m.', '6:03 p.m.', '6:19 p.m.', '6:35 p.m.', '6:51 p.m.', '7:07 p.m.', '7:23 p.m.', '7:39 p.m.', '7:55 p.m.', '8:09 p.m.', '8:25 p.m.', '8:41 p.m.', '8:57 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B015%2FP15_IMG1.PNG?alt=media&token=14bd557c-4f38-49b3-9701-2b04dd070ef4' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B015%2FP15_IMG2.PNG?alt=media&token=df0c2420-6ca1-4846-b3da-044560309816' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B015%2FP15_IMG3.PNG?alt=media&token=a1a404f0-a094-44a8-b565-2d05ab4b4f93' }
          ]
        },
        {
          numParada: '16',
          nameParada: 'Hospital Federico Lleras Acosta Sede Limonar',
          coordinates: {
            latitude: 4.435304,
            longitude: -75.204657
          },
          horariosParada: ['5:30 a.m.', '5:46 a.m.', '6:02 a.m.', '6:18 a.m.', '6:34 a.m.', '6:50 a.m.', '7:07 a.m.', '7:24 a.m.', '7:40 a.m.', '7:56 a.m.', '8:12 a.m.', '8:28 a.m.', '8:44 a.m.', '9:00 a.m.', '9:16 a.m.', '9:32 a.m.', '9:48 a.m.', '10:04 a.m.', '10:19 a.m.', '10:35 a.m.', '10:51 a.m.', '11:07 a.m.', '11:23 a.m.', '11:39 a.m.', '11:55 a.m.', '12:11 p.m.', '12:27 p.m.', '12:43 p.m.', '12:59 p.m.', '1:15 p.m.', '1:31 p.m.', '1:47 p.m.', '2:03 p.m.', '2:19 p.m.', '2:35 p.m.', '2:51 p.m.', '3:07 p.m.', '3:24 p.m.', '3:40 p.m.', '3:56 p.m.', '4:12 p.m.', '4:28 p.m.', '4:44 p.m.', '5:00 p.m.', '5:16 p.m.', '5:32 p.m.', '5:48 p.m.', '6:04 p.m.', '6:20 p.m.', '6:36 p.m.', '6:52 p.m.', '7:08 p.m.', '7:24 p.m.', '7:40 p.m.', '7:56 p.m.', '8:10 p.m.', '8:26 p.m.', '8:42 p.m.', '8:58 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B016%2FP16_IMG1.PNG?alt=media&token=7c54c4ec-db87-46e0-b48b-69bf5307f441' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B016%2FP16_IMG2.PNG?alt=media&token=3a7e27ae-27dc-49ca-aff0-b896639c6d6d' }
          ]
        },
        {
          numParada: '17',
          nameParada: 'Cra. 5 X Call. 47',
          coordinates: {
            latitude: 4.433148,
            longitude: -75.206838
          },
          horariosParada: ['5:31 a.m.', '5:47 a.m.', '6:03 a.m.', '6:19 a.m.', '6:35 a.m.', '6:51 a.m.', '7:08 a.m.', '7:25 a.m.', '7:41 a.m.', '7:57 a.m.', '8:13 a.m.', '8:29 a.m.', '8:45 a.m.', '9:01 a.m.', '9:17 a.m.', '9:33 a.m.', '9:49 a.m.', '10:05 a.m.', '10:20 a.m.', '10:36 a.m.', '10:52 a.m.', '11:08 a.m.', '11:24 a.m.', '11:40 a.m.', '11:56 a.m.', '12:12 p.m.', '12:28 p.m.', '12:44 p.m.', '1:00 p.m.', '1:16 p.m.', '1:32 p.m.', '1:48 p.m.', '2:04 p.m.', '2:20 p.m.', '2:36 p.m.', '2:52 p.m.', '3:08 p.m.', '3:25 p.m.', '3:41 p.m.', '3:57 p.m.', '4:13 p.m.', '4:29 p.m.', '4:45 p.m.', '5:01 p.m.', '5:17 p.m.', '5:33 p.m.', '5:49 p.m.', '6:05 p.m.', '6:21 p.m.', '6:37 p.m.', '6:53 p.m.', '7:09 p.m.', '7:25 p.m.', '7:41 p.m.', '7:57 p.m.', '8:11 p.m.', '8:27 p.m.', '8:43 p.m.', '8:59 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B017%2FP17_IMG1.PNG?alt=media&token=ce6b506d-20d4-47ef-b830-81533a9e938c' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B017%2FP17_IMG2.PNG?alt=media&token=8e05f83d-f53d-45fc-af94-3712cffce6c6' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B017%2FP17_IMG3.PNG?alt=media&token=28f2f615-117f-49c6-9e53-f3f71a6ae3fc' }
          ]
        },
        {
          numParada: '18',
          nameParada: 'Piedrapintada (Cra. 5 X Cll. 44)',
          coordinates: {
            latitude: 4.432213,
            longitude: -75.208810
          },
          horariosParada: ['5:32 a.m.', '5:48 a.m.', '6:04 a.m.', '6:20 a.m.', '6:36 a.m.', '6:52 a.m.', '7:09 a.m.', '7:26 a.m.', '7:42 a.m.', '7:58 a.m.', '8:14 a.m.', '8:30 a.m.', '8:46 a.m.', '9:02 a.m.', '9:18 a.m.', '9:34 a.m.', '9:50 a.m.', '10:06 a.m.', '10:21 a.m.', '10:37 a.m.', '10:53 a.m.', '11:09 a.m.', '11:25 a.m.', '11:41 a.m.', '11:57 a.m.', '12:13 p.m.', '12:29 p.m.', '12:45 p.m.', '1:01 p.m.', '1:17 p.m.', '1:33 p.m.', '1:49 p.m.', '2:05 p.m.', '2:21 p.m.', '2:37 p.m.', '2:53 p.m.', '3:09 p.m.', '3:26 p.m.', '3:42 p.m.', '3:58 p.m.', '4:14 p.m.', '4:30 p.m.', '4:46 p.m.', '5:02 p.m.', '5:18 p.m.', '5:34 p.m.', '5:50 p.m.', '6:06 p.m.', '6:22 p.m.', '6:38 p.m.', '6:54 p.m.', '7:10 p.m.', '7:26 p.m.', '7:42 p.m.', '7:58 p.m.', '8:12 p.m.', '8:28 p.m.', '8:44 p.m.', '9:00 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B018%2FP18_IMG1.PNG?alt=media&token=ea74862e-7251-448e-9b65-d8e9e29cdcee' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B018%2FP18_IMG2.PNG?alt=media&token=5d1161aa-baee-4ca9-9419-f8dd1801a15d' }
          ]
        },
        {
          numParada: '19',
          nameParada: 'Centro Médico Javeriano',
          coordinates: {
            latitude: 4.433307,
            longitude: -75.210296
          },
          horariosParada: ['5:32 a.m.', '5:48 a.m.', '6:04 a.m.', '6:20 a.m.', '6:36 a.m.', '6:52 a.m.', '7:09 a.m.', '7:26 a.m.', '7:42 a.m.', '7:58 a.m.', '8:14 a.m.', '8:30 a.m.', '8:46 a.m.', '9:02 a.m.', '9:18 a.m.', '9:34 a.m.', '9:50 a.m.', '10:06 a.m.', '10:21 a.m.', '10:37 a.m.', '10:53 a.m.', '11:09 a.m.', '11:25 a.m.', '11:41 a.m.', '11:57 a.m.', '12:13 p.m.', '12:29 p.m.', '12:45 p.m.', '1:01 p.m.', '1:17 p.m.', '1:33 p.m.', '1:49 p.m.', '2:05 p.m.', '2:21 p.m.', '2:37 p.m.', '2:53 p.m.', '3:09 p.m.', '3:26 p.m.', '3:42 p.m.', '3:58 p.m.', '4:14 p.m.', '4:30 p.m.', '4:46 p.m.', '5:02 p.m.', '5:18 p.m.', '5:34 p.m.', '5:50 p.m.', '6:06 p.m.', '6:22 p.m.', '6:38 p.m.', '6:54 p.m.', '7:10 p.m.', '7:26 p.m.', '7:42 p.m.', '7:58 p.m.', '8:12 p.m.', '8:28 p.m.', '8:44 p.m.', '9:00 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B019%2FP19_IMG1.PNG?alt=media&token=0f869c85-1ee4-491c-9646-338fb59694e1' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B019%2FP19_IMG2.PNG?alt=media&token=8eb608d1-d98f-46f1-890a-62a881510df7' }
          ]
        },
        {
          numParada: '20',
          nameParada: 'Cra. 5 X Cll. 43',
          coordinates: {
            latitude: 4.434534,
            longitude: -75.210998
          },
          horariosParada: ['5:32 a.m.', '5:48 a.m.', '6:04 a.m.', '6:20 a.m.', '6:36 a.m.', '6:52 a.m.', '7:09 a.m.', '7:26 a.m.', '7:42 a.m.', '7:58 a.m.', '8:14 a.m.', '8:30 a.m.', '8:46 a.m.', '9:02 a.m.', '9:18 a.m.', '9:34 a.m.', '9:50 a.m.', '10:06 a.m.', '10:21 a.m.', '10:37 a.m.', '10:53 a.m.', '11:09 a.m.', '11:25 a.m.', '11:41 a.m.', '11:57 a.m.', '12:13 p.m.', '12:29 p.m.', '12:45 p.m.', '1:01 p.m.', '1:17 p.m.', '1:33 p.m.', '1:49 p.m.', '2:05 p.m.', '2:21 p.m.', '2:37 p.m.', '2:53 p.m.', '3:09 p.m.', '3:26 p.m.', '3:42 p.m.', '3:58 p.m.', '4:14 p.m.', '4:30 p.m.', '4:46 p.m.', '5:02 p.m.', '5:18 p.m.', '5:34 p.m.', '5:50 p.m.', '6:06 p.m.', '6:22 p.m.', '6:38 p.m.', '6:54 p.m.', '7:10 p.m.', '7:26 p.m.', '7:42 p.m.', '7:58 p.m.', '8:12 p.m.', '8:28 p.m.', '8:44 p.m.', '9:00 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B020%2FP20_IMG1.PNG?alt=media&token=c9ae1056-8dbb-4997-82c7-b711f0a17d24' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B020%2FP20_IMG2.PNG?alt=media&token=48e1c35c-0948-4a65-b117-bcba2bfe99a8' }
          ]
        },
        {
          numParada: '21',
          nameParada: 'Icbf / Unidad Deportiva La 42',
          coordinates: {
            latitude: 4.434998,
            longitude: -75.211527
          },
          horariosParada: ['5:33 a.m.', '5:49 a.m.', '6:05 a.m.', '6:21 a.m.', '6:37 a.m.', '6:53 a.m.', '7:10 a.m.', '7:27 a.m.', '7:43 a.m.', '7:59 a.m.', '8:15 a.m.', '8:31 a.m.', '8:47 a.m.', '9:03 a.m.', '9:19 a.m.', '9:35 a.m.', '9:51 a.m.', '10:07 a.m.', '10:22 a.m.', '10:38 a.m.', '10:54 a.m.', '11:10 a.m.', '11:26 a.m.', '11:42 a.m.', '11:58 a.m.', '12:14 p.m.', '12:30 p.m.', '12:46 p.m.', '1:02 p.m.', '1:18 p.m.', '1:34 p.m.', '1:50 p.m.', '2:06 p.m.', '2:22 p.m.', '2:38 p.m.', '2:54 p.m.', '3:10 p.m.', '3:27 p.m.', '3:43 p.m.', '3:59 p.m.', '4:15 p.m.', '4:31 p.m.', '4:47 p.m.', '5:03 p.m.', '5:19 p.m.', '5:35 p.m.', '5:51 p.m.', '6:07 p.m.', '6:23 p.m.', '6:39 p.m.', '6:55 p.m.', '7:11 p.m.', '7:27 p.m.', '7:43 p.m.', '7:59 p.m.', '8:13 p.m.', '8:29 p.m.', '8:45 p.m.', '9:01 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B021%2FP21_IMG1.PNG?alt=media&token=4dcb342b-0187-4cca-ad3e-b1a4e4a31f5b' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B021%2FP21_IMG2.PNG?alt=media&token=65c134da-7f86-43aa-a8a2-e354d7958f93' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B021%2FP21_IMG3.PNG?alt=media&token=550138ce-95d9-44da-aa6f-905d0d87928d' }
          ]
        },
        {
          numParada: '22',
          nameParada: 'Nueva Eps',
          coordinates: {
            latitude: 4.435584,
            longitude: -75.212165
          },
          horariosParada: ['5:33 a.m.', '5:49 a.m.', '6:05 a.m.', '6:21 a.m.', '6:37 a.m.', '6:53 a.m.', '7:10 a.m.', '7:27 a.m.', '7:43 a.m.', '7:59 a.m.', '8:15 a.m.', '8:31 a.m.', '8:47 a.m.', '9:03 a.m.', '9:19 a.m.', '9:35 a.m.', '9:51 a.m.', '10:07 a.m.', '10:22 a.m.', '10:38 a.m.', '10:54 a.m.', '11:10 a.m.', '11:26 a.m.', '11:42 a.m.', '11:58 a.m.', '12:14 p.m.', '12:30 p.m.', '12:46 p.m.', '1:02 p.m.', '1:18 p.m.', '1:34 p.m.', '1:50 p.m.', '2:06 p.m.', '2:22 p.m.', '2:38 p.m.', '2:54 p.m.', '3:10 p.m.', '3:27 p.m.', '3:43 p.m.', '3:59 p.m.', '4:15 p.m.', '4:31 p.m.', '4:47 p.m.', '5:03 p.m.', '5:19 p.m.', '5:35 p.m.', '5:51 p.m.', '6:07 p.m.', '6:23 p.m.', '6:39 p.m.', '6:55 p.m.', '7:11 p.m.', '7:27 p.m.', '7:43 p.m.', '7:59 p.m.', '8:13 p.m.', '8:29 p.m.', '8:45 p.m.', '9:01 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B022%2FP22_IMG1.PNG?alt=media&token=33ccd92a-fcb9-4c48-9eaf-91c1089557a9' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B022%2FP22_IMG2.PNG?alt=media&token=7348a6f7-8244-40dc-acac-aef8bab76414' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B022%2FP22_IMG3.PNG?alt=media&token=6557e4df-0aa7-4ae7-be9f-b913138ac926' }
          ]
        },
        {
          numParada: '23',
          nameParada: 'Movistar',
          coordinates: {
            latitude: 4.436741,
            longitude: -75.214219
          },
          horariosParada: ['5:34 a.m.', '5:50 a.m.', '6:06 a.m.', '6:22 a.m.', '6:38 a.m.', '6:54 a.m.', '7:11 a.m.', '7:28 a.m.', '7:44 a.m.', '8:00 a.m.', '8:16 a.m.', '8:32 a.m.', '8:48 a.m.', '9:04 a.m.', '9:20 a.m.', '9:36 a.m.', '9:52 a.m.', '10:08 a.m.', '10:23 a.m.', '10:39 a.m.', '10:55 a.m.', '11:11 a.m.', '11:27 a.m.', '11:43 a.m.', '11:59 a.m.', '12:15 p.m.', '12:31 p.m.', '12:47 p.m.', '1:03 p.m.', '1:19 p.m.', '1:35 p.m.', '1:51 p.m.', '2:07 p.m.', '2:23 p.m.', '2:39 p.m.', '2:55 p.m.', '3:11 p.m.', '3:28 p.m.', '3:44 p.m.', '4:00 p.m.', '4:16 p.m.', '4:32 p.m.', '4:48 p.m.', '5:04 p.m.', '5:20 p.m.', '5:36 p.m.', '5:52 p.m.', '6:08 p.m.', '6:24 p.m.', '6:40 p.m.', '6:56 p.m.', '7:12 p.m.', '7:28 p.m.', '7:44 p.m.', '8:00 p.m.', '8:14 p.m.', '8:30 p.m.', '8:46 p.m.', '9:02 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B023%2FP23_IMG1.PNG?alt=media&token=47c4f256-1d9e-4bcc-a496-c7b6d2a22bb5' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B023%2FP23_IMG2.PNG?alt=media&token=69ad000e-2369-48eb-9b5b-fa32d129ab35' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B023%2FP23_IMG3.PNG?alt=media&token=185f728e-2cb3-4599-8123-d2dd5099b571' }
          ]
        },
        {
          numParada: '24',
          nameParada: 'Yamaha',
          coordinates: {
            latitude: 4.437186,
            longitude: -75.215030
          },
          horariosParada: ['5:34 a.m.', '5:50 a.m.', '6:06 a.m.', '6:22 a.m.', '6:38 a.m.', '6:54 a.m.', '7:11 a.m.', '7:28 a.m.', '7:44 a.m.', '8:00 a.m.', '8:16 a.m.', '8:32 a.m.', '8:48 a.m.', '9:04 a.m.', '9:20 a.m.', '9:36 a.m.', '9:52 a.m.', '10:08 a.m.', '10:23 a.m.', '10:39 a.m.', '10:55 a.m.', '11:11 a.m.', '11:27 a.m.', '11:43 a.m.', '11:59 a.m.', '12:15 p.m.', '12:31 p.m.', '12:47 p.m.', '1:03 p.m.', '1:19 p.m.', '1:35 p.m.', '1:51 p.m.', '2:07 p.m.', '2:23 p.m.', '2:39 p.m.', '2:55 p.m.', '3:11 p.m.', '3:28 p.m.', '3:44 p.m.', '4:00 p.m.', '4:16 p.m.', '4:32 p.m.', '4:48 p.m.', '5:04 p.m.', '5:20 p.m.', '5:36 p.m.', '5:52 p.m.', '6:08 p.m.', '6:24 p.m.', '6:40 p.m.', '6:56 p.m.', '7:12 p.m.', '7:28 p.m.', '7:44 p.m.', '8:00 p.m.', '8:14 p.m.', '8:30 p.m.', '8:46 p.m.', '9:02 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B024%2FP24_IMG1.PNG?alt=media&token=8c8da13f-4d13-422e-b9a9-097a094f667b' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B024%2FP24_IMG2.PNG?alt=media&token=f46dc443-6740-4aac-87bc-9a51472493f3' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B024%2FP24_IMG3.PNG?alt=media&token=7ed816fd-f726-4cfa-83de-b4a9d1c0693a' }
          ]
        },
        {
          numParada: '25',
          nameParada: 'Colegio San Simón',
          coordinates: {
            latitude: 4.438687,
            longitude: -75.218487
          },
          horariosParada: ['5:35 a.m.', '5:51 a.m.', '6:07 a.m.', '6:23 a.m.', '6:39 a.m.', '6:55 a.m.', '7:12 a.m.', '7:29 a.m.', '7:45 a.m.', '8:01 a.m.', '8:17 a.m.', '8:33 a.m.', '8:49 a.m.', '9:05 a.m.', '9:21 a.m.', '9:37 a.m.', '9:53 a.m.', '10:09 a.m.', '10:24 a.m.', '10:40 a.m.', '10:56 a.m.', '11:12 a.m.', '11:28 a.m.', '11:44 a.m.', '12:00 p.m.', '12:16 p.m.', '12:32 p.m.', '12:48 p.m.', '1:04 p.m.', '1:20 p.m.', '1:36 p.m.', '1:52 p.m.', '2:08 p.m.', '2:24 p.m.', '2:40 p.m.', '2:56 p.m.', '3:12 p.m.', '3:29 p.m.', '3:45 p.m.', '4:01 p.m.', '4:17 p.m.', '4:33 p.m.', '4:49 p.m.', '5:05 p.m.', '5:21 p.m.', '5:37 p.m.', '5:53 p.m.', '6:09 p.m.', '6:25 p.m.', '6:41 p.m.', '6:57 p.m.', '7:13 p.m.', '7:29 p.m.', '7:45 p.m.', '8:01 p.m.', '8:15 p.m.', '8:31 p.m.', '8:47 p.m.', '9:03 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B025%2FP25_IMG1.PNG?alt=media&token=9fffe109-5e78-4d59-aedc-e6826c763d52' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B025%2FP25_IMG2.PNG?alt=media&token=b2ea05b8-b46c-4c71-9a40-9ae0ed1d37ae' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B025%2FP25_IMG3.PNG?alt=media&token=1af2b7b4-4cc8-4889-bb44-155ba245dc48' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B025%2FP25_IMG4.PNG?alt=media&token=e68be692-df3f-403a-9148-75891ff17f95' }
          ]
        },
        {
          numParada: '26',
          nameParada: 'Cra. 5 X Cll. 34',
          coordinates: {
            latitude: 4.438910,
            longitude: -75.219348
          },
          horariosParada: ['5:35 a.m.', '5:51 a.m.', '6:07 a.m.', '6:23 a.m.', '6:39 a.m.', '6:55 a.m.', '7:12 a.m.', '7:29 a.m.', '7:45 a.m.', '8:01 a.m.', '8:17 a.m.', '8:33 a.m.', '8:49 a.m.', '9:05 a.m.', '9:21 a.m.', '9:37 a.m.', '9:53 a.m.', '10:09 a.m.', '10:24 a.m.', '10:40 a.m.', '10:56 a.m.', '11:12 a.m.', '11:28 a.m.', '11:44 a.m.', '12:00 p.m.', '12:16 p.m.', '12:32 p.m.', '12:48 p.m.', '1:04 p.m.', '1:20 p.m.', '1:36 p.m.', '1:52 p.m.', '2:08 p.m.', '2:24 p.m.', '2:40 p.m.', '2:56 p.m.', '3:12 p.m.', '3:29 p.m.', '3:45 p.m.', '4:01 p.m.', '4:17 p.m.', '4:33 p.m.', '4:49 p.m.', '5:05 p.m.', '5:21 p.m.', '5:37 p.m.', '5:53 p.m.', '6:09 p.m.', '6:25 p.m.', '6:41 p.m.', '6:57 p.m.', '7:13 p.m.', '7:29 p.m.', '7:45 p.m.', '8:01 p.m.', '8:15 p.m.', '8:31 p.m.', '8:47 p.m.', '9:03 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B026%2FP26_IMG1.PNG?alt=media&token=a02d3957-7a5a-4082-879b-3846138f5b22' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B026%2FP26_IMG2.PNG?alt=media&token=0030cd1d-fc3e-48e5-9aba-6d9844943a44' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B026%2FP26_IMG3.PNG?alt=media&token=3d50fde8-63b3-4f4f-8154-a9f52f5ee32e' }
          ]
        },
        {
          numParada: '27',
          nameParada: 'Carrera 5a, 3233',
          coordinates: {
            latitude: 4.439209,
            longitude: -75.220216
          },
          horariosParada: ['5:35 a.m.', '5:51 a.m.', '6:07 a.m.', '6:23 a.m.', '6:39 a.m.', '6:55 a.m.', '7:12 a.m.', '7:29 a.m.', '7:45 a.m.', '8:01 a.m.', '8:17 a.m.', '8:33 a.m.', '8:49 a.m.', '9:05 a.m.', '9:21 a.m.', '9:37 a.m.', '9:53 a.m.', '10:09 a.m.', '10:24 a.m.', '10:40 a.m.', '10:56 a.m.', '11:12 a.m.', '11:28 a.m.', '11:44 a.m.', '12:00 p.m.', '12:16 p.m.', '12:32 p.m.', '12:48 p.m.', '1:04 p.m.', '1:20 p.m.', '1:36 p.m.', '1:52 p.m.', '2:08 p.m.', '2:24 p.m.', '2:40 p.m.', '2:56 p.m.', '3:12 p.m.', '3:29 p.m.', '3:45 p.m.', '4:01 p.m.', '4:17 p.m.', '4:33 p.m.', '4:49 p.m.', '5:05 p.m.', '5:21 p.m.', '5:37 p.m.', '5:53 p.m.', '6:09 p.m.', '6:25 p.m.', '6:41 p.m.', '6:57 p.m.', '7:13 p.m.', '7:29 p.m.', '7:45 p.m.', '8:01 p.m.', '8:15 p.m.', '8:31 p.m.', '8:47 p.m.', '9:03 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B027%2FP27_IMG1.PNG?alt=media&token=238d43bb-e376-4b01-be7f-1b62768e5ea8' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B027%2FP27_IMG2.PNG?alt=media&token=1ca55562-1142-431e-a6d3-07916f7a5566' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B027%2FP27_IMG3.PNG?alt=media&token=7be2f09f-f224-4152-86a6-f653167e8c2c' }
          ]
        },
        {
          numParada: '28',
          nameParada: 'Cra. 5 X Cll. 30',
          coordinates: {
            latitude: 4.439872,
            longitude: -75.221973
          },
          horariosParada: ['5:36 a.m.', '5:52 a.m.', '6:08 a.m.', '6:24 a.m.', '6:40 a.m.', '6:56 a.m.', '7:13 a.m.', '7:30 a.m.', '7:46 a.m.', '8:02 a.m.', '8:18 a.m.', '8:34 a.m.', '8:50 a.m.', '9:06 a.m.', '9:22 a.m.', '9:38 a.m.', '9:54 a.m.', '10:10 a.m.', '10:25 a.m.', '10:41 a.m.', '10:57 a.m.', '11:13 a.m.', '11:29 a.m.', '11:45 a.m.', '12:01 p.m.', '12:17 p.m.', '12:33 p.m.', '12:49 p.m.', '1:05 p.m.', '1:21 p.m.', '1:37 p.m.', '1:53 p.m.', '2:09 p.m.', '2:25 p.m.', '2:41 p.m.', '2:57 p.m.', '3:13 p.m.', '3:30 p.m.', '3:46 p.m.', '4:02 p.m.', '4:18 p.m.', '4:34 p.m.', '4:50 p.m.', '5:06 p.m.', '5:22 p.m.', '5:38 p.m.', '5:54 p.m.', '6:10 p.m.', '6:26 p.m.', '6:42 p.m.', '6:58 p.m.', '7:14 p.m.', '7:30 p.m.', '7:46 p.m.', '8:02 p.m.', '8:16 p.m.', '8:32 p.m.', '8:48 p.m.', '9:04 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B028%2FP28_IMG1.PNG?alt=media&token=8c186026-c0a2-4bec-a9c4-32336131968b' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B028%2FP28_IMG2.PNG?alt=media&token=ffb938ce-3b8d-4d5b-bd0c-c440f1eb9c57' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B028%2FP28_IMG3.PNG?alt=media&token=73b5e045-0d13-4300-a4ba-751a9c896bdf' }
          ]
        },
        {
          numParada: '29',
          nameParada: 'Edificio M-30',
          coordinates: {
            latitude: 4.440024,
            longitude: -75.223020
          },
          horariosParada: ['5:36 a.m.', '5:52 a.m.', '6:08 a.m.', '6:24 a.m.', '6:40 a.m.', '6:56 a.m.', '7:13 a.m.', '7:30 a.m.', '7:46 a.m.', '8:02 a.m.', '8:18 a.m.', '8:34 a.m.', '8:50 a.m.', '9:06 a.m.', '9:22 a.m.', '9:38 a.m.', '9:54 a.m.', '10:10 a.m.', '10:25 a.m.', '10:41 a.m.', '10:57 a.m.', '11:13 a.m.', '11:29 a.m.', '11:45 a.m.', '12:01 p.m.', '12:17 p.m.', '12:33 p.m.', '12:49 p.m.', '1:05 p.m.', '1:21 p.m.', '1:37 p.m.', '1:53 p.m.', '2:09 p.m.', '2:25 p.m.', '2:41 p.m.', '2:57 p.m.', '3:13 p.m.', '3:30 p.m.', '3:46 p.m.', '4:02 p.m.', '4:18 p.m.', '4:34 p.m.', '4:50 p.m.', '5:06 p.m.', '5:22 p.m.', '5:38 p.m.', '5:54 p.m.', '6:10 p.m.', '6:26 p.m.', '6:42 p.m.', '6:58 p.m.', '7:14 p.m.', '7:30 p.m.', '7:46 p.m.', '8:02 p.m.', '8:16 p.m.', '8:32 p.m.', '8:48 p.m.', '9:04 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B029%2FP29_IMG1.PNG?alt=media&token=7a5d8c35-1c90-4dc9-9ccf-d99fb2f5ede6' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B029%2FP29_IMG2.PNG?alt=media&token=d6ad72d7-a14f-48fe-b15a-2ecef852c873' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B029%2FP29_IMG3.PNG?alt=media&token=22d9f86b-27fb-4470-a6b2-d9830a2cc429' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B029%2FP29_IMG4.PNG?alt=media&token=fbad396d-0453-489b-97db-7163396b77d9' }
          ]
        },
        {
          numParada: '30',
          nameParada: 'Cra. 5 X Cll. 26',
          coordinates: {
            latitude: 4.440356,
            longitude: -75.225918
          },
          horariosParada: ['5:37 a.m.', '5:53 a.m.', '6:09 a.m.', '6:25 a.m.', '6:41 a.m.', '6:57 a.m.', '7:14 a.m.', '7:31 a.m.', '7:47 a.m.', '8:03 a.m.', '8:19 a.m.', '8:35 a.m.', '8:51 a.m.', '9:07 a.m.', '9:23 a.m.', '9:39 a.m.', '9:55 a.m.', '10:11 a.m.', '10:26 a.m.', '10:42 a.m.', '10:58 a.m.', '11:14 a.m.', '11:30 a.m.', '11:46 a.m.', '12:02 p.m.', '12:18 p.m.', '12:34 p.m.', '12:50 p.m.', '1:06 p.m.', '1:22 p.m.', '1:38 p.m.', '1:54 p.m.', '2:10 p.m.', '2:26 p.m.', '2:42 p.m.', '2:58 p.m.', '3:14 p.m.', '3:31 p.m.', '3:47 p.m.', '4:03 p.m.', '4:19 p.m.', '4:35 p.m.', '4:51 p.m.', '5:07 p.m.', '5:23 p.m.', '5:39 p.m.', '5:55 p.m.', '6:11 p.m.', '6:27 p.m.', '6:43 p.m.', '6:59 p.m.', '7:15 p.m.', '7:31 p.m.', '7:47 p.m.', '8:03 p.m.', '8:17 p.m.', '8:33 p.m.', '8:49 p.m.', '9:05 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B030%2FP30_IMG1.PNG?alt=media&token=3f2abb96-a5ef-4c0e-94a9-5ed523c867a4' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B030%2FP30_IMG2.PNG?alt=media&token=469ecc19-ea54-4f30-b441-2198b9617742' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B030%2FP30_IMG3.PNG?alt=media&token=ba44e189-ebb5-40e8-ad7d-431564e09d92' }
          ]
        },
        {
          numParada: '31',
          nameParada: 'Sitsa',
          coordinates: {
            latitude: 4.440440,
            longitude: -75.226654
          },
          horariosParada: ['5:37 a.m.', '5:53 a.m.', '6:09 a.m.', '6:25 a.m.', '6:41 a.m.', '6:57 a.m.', '7:14 a.m.', '7:31 a.m.', '7:47 a.m.', '8:03 a.m.', '8:19 a.m.', '8:35 a.m.', '8:51 a.m.', '9:07 a.m.', '9:23 a.m.', '9:39 a.m.', '9:55 a.m.', '10:11 a.m.', '10:26 a.m.', '10:42 a.m.', '10:58 a.m.', '11:14 a.m.', '11:30 a.m.', '11:46 a.m.', '12:02 p.m.', '12:18 p.m.', '12:34 p.m.', '12:50 p.m.', '1:06 p.m.', '1:22 p.m.', '1:38 p.m.', '1:54 p.m.', '2:10 p.m.', '2:26 p.m.', '2:42 p.m.', '2:58 p.m.', '3:14 p.m.', '3:31 p.m.', '3:47 p.m.', '4:03 p.m.', '4:19 p.m.', '4:35 p.m.', '4:51 p.m.', '5:07 p.m.', '5:23 p.m.', '5:39 p.m.', '5:55 p.m.', '6:11 p.m.', '6:27 p.m.', '6:43 p.m.', '6:59 p.m.', '7:15 p.m.', '7:31 p.m.', '7:47 p.m.', '8:03 p.m.', '8:17 p.m.', '8:33 p.m.', '8:49 p.m.', '9:05 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B031%2FP31_IMG1.PNG?alt=media&token=42d1720a-52c9-4082-b3bb-24feb653ac66' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B031%2FP31_IMG2.PNG?alt=media&token=91bc4570-2623-453d-80d2-507107913ffc' }
          ]
        },
        {
          numParada: '32',
          nameParada: 'Cra. 5 X Cll. 23',
          coordinates: {
            latitude: 4.440704,
            longitude: -75.228914
          },
          horariosParada: ['5:38 a.m.', '5:54 a.m.', '6:10 a.m.', '6:26 a.m.', '6:42 a.m.', '6:58 a.m.', '7:15 a.m.', '7:32 a.m.', '7:48 a.m.', '8:04 a.m.', '8:20 a.m.', '8:36 a.m.', '8:52 a.m.', '9:08 a.m.', '9:24 a.m.', '9:40 a.m.', '9:56 a.m.', '10:12 a.m.', '10:27 a.m.', '10:43 a.m.', '10:59 a.m.', '11:15 a.m.', '11:31 a.m.', '11:47 a.m.', '12:03 p.m.', '12:19 p.m.', '12:35 p.m.', '12:51 p.m.', '1:07 p.m.', '1:23 p.m.', '1:39 p.m.', '1:55 p.m.', '2:11 p.m.', '2:27 p.m.', '2:43 p.m.', '2:59 p.m.', '3:15 p.m.', '3:32 p.m.', '3:48 p.m.', '4:04 p.m.', '4:20 p.m.', '4:36 p.m.', '4:52 p.m.', '5:08 p.m.', '5:24 p.m.', '5:40 p.m.', '5:56 p.m.', '6:12 p.m.', '6:28 p.m.', '6:44 p.m.', '7:00 p.m.', '7:16 p.m.', '7:32 p.m.', '7:48 p.m.', '8:04 p.m.', '8:18 p.m.', '8:34 p.m.', '8:50 p.m.', '9:06 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B032%2FP32_IMG1.PNG?alt=media&token=b684f938-f43d-4584-9b1a-10f15e6583a9' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B032%2FP32_IMG2.PNG?alt=media&token=e75a5d60-feac-4ec0-aaf6-8f97326ce17c' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B032%2FP32_IMG3.PNG?alt=media&token=8a214383-829d-4888-bb95-4b25299823c4' }
          ]
        },
        {
          numParada: '33',
          nameParada: 'Cra. 5 X Cll. 22',
          coordinates: {
            latitude: 4.441075,
            longitude: -75.230234
          },
          horariosParada: ['5:38 a.m.', '5:54 a.m.', '6:10 a.m.', '6:26 a.m.', '6:42 a.m.', '6:58 a.m.', '7:15 a.m.', '7:32 a.m.', '7:48 a.m.', '8:04 a.m.', '8:20 a.m.', '8:36 a.m.', '8:52 a.m.', '9:08 a.m.', '9:24 a.m.', '9:40 a.m.', '9:56 a.m.', '10:12 a.m.', '10:27 a.m.', '10:43 a.m.', '10:59 a.m.', '11:15 a.m.', '11:31 a.m.', '11:47 a.m.', '12:03 p.m.', '12:19 p.m.', '12:35 p.m.', '12:51 p.m.', '1:07 p.m.', '1:23 p.m.', '1:39 p.m.', '1:55 p.m.', '2:11 p.m.', '2:27 p.m.', '2:43 p.m.', '2:59 p.m.', '3:15 p.m.', '3:32 p.m.', '3:48 p.m.', '4:04 p.m.', '4:20 p.m.', '4:36 p.m.', '4:52 p.m.', '5:08 p.m.', '5:24 p.m.', '5:40 p.m.', '5:56 p.m.', '6:12 p.m.', '6:28 p.m.', '6:44 p.m.', '7:00 p.m.', '7:16 p.m.', '7:32 p.m.', '7:48 p.m.', '8:04 p.m.', '8:18 p.m.', '8:34 p.m.', '8:50 p.m.', '9:06 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B033%2FP33_IMG1.PNG?alt=media&token=eab14552-92fc-4565-8d7a-3f1548ea7405' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B033%2FP33_IMG2.PNG?alt=media&token=5b9b2326-2868-4e42-b0ea-28758ad4d58e' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B033%2FP33_IMG3.PNG?alt=media&token=ba0d0cee-5cd6-49a2-9a3e-e4e7e32680e6' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B033%2FP33_IMG4.PNG?alt=media&token=ce5d0c94-6a07-40b1-9119-1a6bbd4f437d' }
          ]
        },
        {
          numParada: '34',
          nameParada: 'Plaza 21',
          coordinates: {
            latitude: 4.441446,
            longitude: -75.231221
          },
          horariosParada: ['5:39 a.m.', '5:55 a.m.', '6:11 a.m.', '6:27 a.m.', '6:43 a.m.', '6:59 a.m.', '7:16 a.m.', '7:33 a.m.', '7:49 a.m.', '8:05 a.m.', '8:21 a.m.', '8:37 a.m.', '8:53 a.m.', '9:09 a.m.', '9:25 a.m.', '9:41 a.m.', '9:57 a.m.', '10:13 a.m.', '10:28 a.m.', '10:44 a.m.', '11:00 a.m.', '11:16 a.m.', '11:32 a.m.', '11:48 a.m.', '12:04 p.m.', '12:20 p.m.', '12:36 p.m.', '12:52 p.m.', '1:08 p.m.', '1:24 p.m.', '1:40 p.m.', '1:56 p.m.', '2:12 p.m.', '2:28 p.m.', '2:44 p.m.', '3:00 p.m.', '3:16 p.m.', '3:33 p.m.', '3:49 p.m.', '4:05 p.m.', '4:21 p.m.', '4:37 p.m.', '4:53 p.m.', '5:09 p.m.', '5:25 p.m.', '5:41 p.m.', '5:57 p.m.', '6:13 p.m.', '6:29 p.m.', '6:45 p.m.', '7:01 p.m.', '7:17 p.m.', '7:33 p.m.', '7:49 p.m.', '8:05 p.m.', '8:19 p.m.', '8:35 p.m.', '8:51 p.m.', '9:07 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B034%2FP34_IMG1.PNG?alt=media&token=d7e7b36d-9837-4b3e-b4a5-9e93453b07e8' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B034%2FP34_IMG2.PNG?alt=media&token=a3c6722a-37b1-414d-80ee-ce95630f5dc0' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B034%2FP34_IMG3.PNG?alt=media&token=c7485ac5-b062-4473-b567-522ae329b238' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B034%2FP34_IMG4.PNG?alt=media&token=c50941d9-9b4c-4e7b-bf69-5da652775802' }
          ]
        },
        {
          numParada: '35',
          nameParada: 'Cra. 5 X Cll. 20',
          coordinates: {
            latitude: 4.441733,
            longitude: -75.232108
          },
          horariosParada: ['5:39 a.m.', '5:55 a.m.', '6:11 a.m.', '6:27 a.m.', '6:43 a.m.', '6:59 a.m.', '7:16 a.m.', '7:33 a.m.', '7:49 a.m.', '8:05 a.m.', '8:21 a.m.', '8:37 a.m.', '8:53 a.m.', '9:09 a.m.', '9:25 a.m.', '9:41 a.m.', '9:57 a.m.', '10:13 a.m.', '10:28 a.m.', '10:44 a.m.', '11:00 a.m.', '11:16 a.m.', '11:32 a.m.', '11:48 a.m.', '12:04 p.m.', '12:20 p.m.', '12:36 p.m.', '12:52 p.m.', '1:08 p.m.', '1:24 p.m.', '1:40 p.m.', '1:56 p.m.', '2:12 p.m.', '2:28 p.m.', '2:44 p.m.', '3:00 p.m.', '3:16 p.m.', '3:33 p.m.', '3:49 p.m.', '4:05 p.m.', '4:21 p.m.', '4:37 p.m.', '4:53 p.m.', '5:09 p.m.', '5:25 p.m.', '5:41 p.m.', '5:57 p.m.', '6:13 p.m.', '6:29 p.m.', '6:45 p.m.', '7:01 p.m.', '7:17 p.m.', '7:33 p.m.', '7:49 p.m.', '8:05 p.m.', '8:19 p.m.', '8:35 p.m.', '8:51 p.m.', '9:07 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B035%2FP35_IMG1.PNG?alt=media&token=307ee31c-705b-482b-b986-1ad33dfaacad' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B035%2FP35_IMG2.PNG?alt=media&token=d23b95d7-060e-4109-ac84-c4ae4415e8da' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B035%2FP35_IMG3.PNG?alt=media&token=5c725419-8753-4afb-b039-24c2c25a503c' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B035%2FP35_IMG4.PNG?alt=media&token=c99a72a7-ac5d-476c-878d-09d7ad9d73ea' }
          ]
        },
        {
          numParada: '36',
          nameParada: 'Cra. 5 X Cll. 15',
          coordinates: {
            latitude: 4.443404,
            longitude: -75.235590
          },
          horariosParada: ['5:40 a.m.', '5:56 a.m.', '6:12 a.m.', '6:28 a.m.', '6:44 a.m.', '7:00 a.m.', '7:17 a.m.', '7:34 a.m.', '7:50 a.m.', '8:06 a.m.', '8:22 a.m.', '8:38 a.m.', '8:54 a.m.', '9:10 a.m.', '9:26 a.m.', '9:42 a.m.', '9:58 a.m.', '10:14 a.m.', '10:29 a.m.', '10:45 a.m.', '11:01 a.m.', '11:17 a.m.', '11:33 a.m.', '11:49 a.m.', '12:05 p.m.', '12:21 p.m.', '12:37 p.m.', '12:53 p.m.', '1:09 p.m.', '1:25 p.m.', '1:41 p.m.', '1:57 p.m.', '2:13 p.m.', '2:29 p.m.', '2:45 p.m.', '3:01 p.m.', '3:17 p.m.', '3:34 p.m.', '3:50 p.m.', '4:06 p.m.', '4:22 p.m.', '4:38 p.m.', '4:54 p.m.', '5:10 p.m.', '5:26 p.m.', '5:42 p.m.', '5:58 p.m.', '6:14 p.m.', '6:30 p.m.', '6:46 p.m.', '7:02 p.m.', '7:18 p.m.', '7:34 p.m.', '7:50 p.m.', '8:06 p.m.', '8:20 p.m.', '8:36 p.m.', '8:52 p.m.', '9:08 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B036%2FP36_IMG1.PNG?alt=media&token=78aca008-ede3-4c5a-991e-4d4632acd7f6' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B036%2FP36_IMG2.PNG?alt=media&token=86dfee12-7a65-4adf-bd90-7713485e3040' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B036%2FP36_IMG3.PNG?alt=media&token=dd0567e5-75d0-43a0-8457-d83aed538cd6' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B036%2FP36_IMG4.PNG?alt=media&token=acd570ca-dd54-4ce1-b159-f8fc6e0b3184' }
          ]
        },
        {
          numParada: '37',
          nameParada: 'Cra. 5 X Cll. 14',
          coordinates: {
            latitude: 4.444524,
            longitude: -75.237722
          },
          horariosParada: ['5:41 a.m.', '5:57 a.m.', '6:13 a.m.', '6:29 a.m.', '6:45 a.m.', '7:01 a.m.', '7:18 a.m.', '7:35 a.m.', '7:51 a.m.', '8:07 a.m.', '8:23 a.m.', '8:39 a.m.', '8:55 a.m.', '9:11 a.m.', '9:27 a.m.', '9:43 a.m.', '9:59 a.m.', '10:15 a.m.', '10:30 a.m.', '10:46 a.m.', '11:02 a.m.', '11:18 a.m.', '11:34 a.m.', '11:50 a.m.', '12:06 p.m.', '12:22 p.m.', '12:38 p.m.', '12:54 p.m.', '1:10 p.m.', '1:26 p.m.', '1:42 p.m.', '1:58 p.m.', '2:14 p.m.', '2:30 p.m.', '2:46 p.m.', '3:02 p.m.', '3:18 p.m.', '3:35 p.m.', '3:51 p.m.', '4:07 p.m.', '4:23 p.m.', '4:39 p.m.', '4:55 p.m.', '5:11 p.m.', '5:27 p.m.', '5:43 p.m.', '5:59 p.m.', '6:15 p.m.', '6:31 p.m.', '6:47 p.m.', '7:03 p.m.', '7:19 p.m.', '7:35 p.m.', '7:51 p.m.', '8:07 p.m.', '8:21 p.m.', '8:37 p.m.', '8:53 p.m.', '9:09 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B037%2FP37_IMG1.PNG?alt=media&token=97dcdba1-3b02-41c3-b2b9-b18bb6c210a4' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B037%2FP37_IMG2.PNG?alt=media&token=6d5c2c29-8cb7-4e02-9ad7-b87f0124a0c4' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B037%2FP37_IMG3.PNG?alt=media&token=d354c5bb-58d9-4164-8b9a-16a763d47d80' }
          ]
        },
        {
          numParada: '38',
          nameParada: 'Cun',
          coordinates: {
            latitude: 4.445742,
            longitude: -75.240453
          },
          horariosParada: ['5:42 a.m.', '5:58 a.m.', '6:14 a.m.', '6:30 a.m.', '6:46 a.m.', '7:02 a.m.', '7:19 a.m.', '7:36 a.m.', '7:52 a.m.', '8:08 a.m.', '8:24 a.m.', '8:40 a.m.', '8:56 a.m.', '9:12 a.m.', '9:28 a.m.', '9:44 a.m.', '10:00 a.m.', '10:16 a.m.', '10:31 a.m.', '10:47 a.m.', '11:03 a.m.', '11:19 a.m.', '11:35 a.m.', '11:51 a.m.', '12:07 p.m.', '12:23 p.m.', '12:39 p.m.', '12:55 p.m.', '1:11 p.m.', '1:27 p.m.', '1:43 p.m.', '1:59 p.m.', '2:15 p.m.', '2:31 p.m.', '2:47 p.m.', '3:03 p.m.', '3:19 p.m.', '3:36 p.m.', '3:52 p.m.', '4:08 p.m.', '4:24 p.m.', '4:40 p.m.', '4:56 p.m.', '5:12 p.m.', '5:28 p.m.', '5:44 p.m.', '6:00 p.m.', '6:16 p.m.', '6:32 p.m.', '6:48 p.m.', '7:04 p.m.', '7:20 p.m.', '7:36 p.m.', '7:52 p.m.', '8:08 p.m.', '8:22 p.m.', '8:38 p.m.', '8:54 p.m.', '9:10 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B038%2FP38_IMG1.PNG?alt=media&token=19421368-f29f-464d-bcdd-8505a9d64293' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B038%2FP38_IMG2.PNG?alt=media&token=bd3b9c7f-8f4d-4862-8953-474780f166fb' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B038%2FP38_IMG3.PNG?alt=media&token=d02c8ffc-505d-4a82-b19e-102b12e878a5' }
          ]
        },
        {
          numParada: '39',
          nameParada: 'Cra. 6 X Cll. 11',
          coordinates: {
            latitude: 4.446158,
            longitude: -75.240188
          },
          horariosParada: ['5:42 a.m.', '5:58 a.m.', '6:14 a.m.', '6:30 a.m.', '6:46 a.m.', '7:02 a.m.', '7:19 a.m.', '7:36 a.m.', '7:52 a.m.', '8:08 a.m.', '8:24 a.m.', '8:40 a.m.', '8:56 a.m.', '9:12 a.m.', '9:28 a.m.', '9:44 a.m.', '10:00 a.m.', '10:16 a.m.', '10:31 a.m.', '10:47 a.m.', '11:03 a.m.', '11:19 a.m.', '11:35 a.m.', '11:51 a.m.', '12:07 p.m.', '12:23 p.m.', '12:39 p.m.', '12:55 p.m.', '1:11 p.m.', '1:27 p.m.', '1:43 p.m.', '1:59 p.m.', '2:15 p.m.', '2:31 p.m.', '2:47 p.m.', '3:03 p.m.', '3:19 p.m.', '3:36 p.m.', '3:52 p.m.', '4:08 p.m.', '4:24 p.m.', '4:40 p.m.', '4:56 p.m.', '5:12 p.m.', '5:28 p.m.', '5:44 p.m.', '6:00 p.m.', '6:16 p.m.', '6:32 p.m.', '6:48 p.m.', '7:04 p.m.', '7:20 p.m.', '7:36 p.m.', '7:52 p.m.', '8:08 p.m.', '8:22 p.m.', '8:38 p.m.', '8:54 p.m.', '9:10 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B039%2FP39_IMG1.PNG?alt=media&token=54716b4e-f6ca-43e6-9364-37d1496c3c37' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B039%2FP39_IMG2.PNG?alt=media&token=1c180bd2-72ac-469f-a6ab-b697d4ac1786' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B039%2FP39_IMG3.PNG?alt=media&token=90ad781a-0d89-48ba-84d9-8528389375fd' }
          ]
        },
        {
          numParada: '40',
          nameParada: 'Skate Plaza',
          coordinates: {
            latitude: 4.446801,
            longitude: -75.238982
          },
          horariosParada: ['5:42 a.m.', '5:58 a.m.', '6:14 a.m.', '6:30 a.m.', '6:46 a.m.', '7:02 a.m.', '7:19 a.m.', '7:36 a.m.', '7:52 a.m.', '8:08 a.m.', '8:24 a.m.', '8:40 a.m.', '8:56 a.m.', '9:12 a.m.', '9:28 a.m.', '9:44 a.m.', '10:00 a.m.', '10:16 a.m.', '10:31 a.m.', '10:47 a.m.', '11:03 a.m.', '11:19 a.m.', '11:35 a.m.', '11:51 a.m.', '12:07 p.m.', '12:23 p.m.', '12:39 p.m.', '12:55 p.m.', '1:11 p.m.', '1:27 p.m.', '1:43 p.m.', '1:59 p.m.', '2:15 p.m.', '2:31 p.m.', '2:47 p.m.', '3:03 p.m.', '3:19 p.m.', '3:36 p.m.', '3:52 p.m.', '4:08 p.m.', '4:24 p.m.', '4:40 p.m.', '4:56 p.m.', '5:12 p.m.', '5:28 p.m.', '5:44 p.m.', '6:00 p.m.', '6:16 p.m.', '6:32 p.m.', '6:48 p.m.', '7:04 p.m.', '7:20 p.m.', '7:36 p.m.', '7:52 p.m.', '8:08 p.m.', '8:22 p.m.', '8:38 p.m.', '8:54 p.m.', '9:10 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B040%2FP40_IMG1.PNG?alt=media&token=ca365213-5abf-4338-941a-5d35845f9a4c' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B040%2FP40_IMG2.PNG?alt=media&token=95f975aa-206b-49da-aad9-ee1755b6076e' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B040%2FP40_IMG3.PNG?alt=media&token=c6da814f-1cf0-4dcc-9456-0a64c6889732' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B040%2FP40_IMG4.PNG?alt=media&token=4abe0105-d696-447a-ae93-ca9707a2f0bb' }
          ]
        },
        {
          numParada: '41',
          nameParada: 'Sexta Brigada (Cra. 8 X Cll. 12)',
          coordinates: {
            latitude: 4.447489,
            longitude: -75.238542
          },
          horariosParada: ['5:42 a.m.', '5:58 a.m.', '6:14 a.m.', '6:30 a.m.', '6:46 a.m.', '7:02 a.m.', '7:19 a.m.', '7:36 a.m.', '7:52 a.m.', '8:08 a.m.', '8:24 a.m.', '8:40 a.m.', '8:56 a.m.', '9:12 a.m.', '9:28 a.m.', '9:44 a.m.', '10:00 a.m.', '10:16 a.m.', '10:31 a.m.', '10:47 a.m.', '11:03 a.m.', '11:19 a.m.', '11:35 a.m.', '11:51 a.m.', '12:07 p.m.', '12:23 p.m.', '12:39 p.m.', '12:55 p.m.', '1:11 p.m.', '1:27 p.m.', '1:43 p.m.', '1:59 p.m.', '2:15 p.m.', '2:31 p.m.', '2:47 p.m.', '3:03 p.m.', '3:19 p.m.', '3:36 p.m.', '3:52 p.m.', '4:08 p.m.', '4:24 p.m.', '4:40 p.m.', '4:56 p.m.', '5:12 p.m.', '5:28 p.m.', '5:44 p.m.', '6:00 p.m.', '6:16 p.m.', '6:32 p.m.', '6:48 p.m.', '7:04 p.m.', '7:20 p.m.', '7:36 p.m.', '7:52 p.m.', '8:08 p.m.', '8:22 p.m.', '8:38 p.m.', '8:54 p.m.', '9:10 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B041%2FP41_IMG1.PNG?alt=media&token=54f53090-ed8e-4956-bb5b-13fa9c68782f' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B041%2FP41_IMG2.PNG?alt=media&token=e87fd380-4bb4-4d99-859b-61f58a83f25f' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B041%2FP41_IMG3.PNG?alt=media&token=4c21601a-6ff7-4c6d-9d1f-d1a96bbf5f95' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B041%2FP41_IMG4.PNG?alt=media&token=e89d3b5d-dffb-4fce-941f-04a1326b9811' }
          ]
        },
        {
          numParada: '42',
          nameParada: 'Urbanización Himalaya',
          coordinates: {
            latitude: 4.449939,
            longitude: -75.236964
          },
          horariosParada: ['5:43 a.m.', '5:59 a.m.', '6:15 a.m.', '6:31 a.m.', '6:47 a.m.', '7:03 a.m.', '7:20 a.m.', '7:37 a.m.', '7:53 a.m.', '8:09 a.m.', '8:25 a.m.', '8:41 a.m.', '8:57 a.m.', '9:13 a.m.', '9:29 a.m.', '9:45 a.m.', '10:01 a.m.', '10:17 a.m.', '10:32 a.m.', '10:48 a.m.', '11:04 a.m.', '11:20 a.m.', '11:36 a.m.', '11:52 a.m.', '12:08 p.m.', '12:24 p.m.', '12:40 p.m.', '12:56 p.m.', '1:12 p.m.', '1:28 p.m.', '1:44 p.m.', '2:00 p.m.', '2:16 p.m.', '2:32 p.m.', '2:48 p.m.', '3:04 p.m.', '3:20 p.m.', '3:37 p.m.', '3:53 p.m.', '4:09 p.m.', '4:25 p.m.', '4:41 p.m.', '4:57 p.m.', '5:13 p.m.', '5:29 p.m.', '5:45 p.m.', '6:01 p.m.', '6:17 p.m.', '6:33 p.m.', '6:49 p.m.', '7:05 p.m.', '7:21 p.m.', '7:37 p.m.', '7:53 p.m.', '8:09 p.m.', '8:23 p.m.', '8:39 p.m.', '8:55 p.m.', '9:11 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B042%2FP42_IMG1.PNG?alt=media&token=f6bfce22-2dc8-4c0b-84e7-12771523a87f' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B042%2FP42_IMG2.PNG?alt=media&token=cfcb08fe-f096-4dff-ace8-461534e57b0e' }
          ]
        },
        {
          numParada: '43',
          nameParada: '20 De Julio',
          coordinates: {
            latitude: 4.452942,
            longitude: -75.235962
          },
          horariosParada: ['5:44 a.m.', '6:00 a.m.', '6:16 a.m.', '6:32 a.m.', '6:48 a.m.', '7:04 a.m.', '7:21 a.m.', '7:38 a.m.', '7:54 a.m.', '8:10 a.m.', '8:26 a.m.', '8:42 a.m.', '8:58 a.m.', '9:14 a.m.', '9:30 a.m.', '9:46 a.m.', '10:02 a.m.', '10:18 a.m.', '10:33 a.m.', '10:49 a.m.', '11:05 a.m.', '11:21 a.m.', '11:37 a.m.', '11:53 a.m.', '12:09 p.m.', '12:25 p.m.', '12:41 p.m.', '12:57 p.m.', '1:13 p.m.', '1:29 p.m.', '1:45 p.m.', '2:01 p.m.', '2:17 p.m.', '2:33 p.m.', '2:49 p.m.', '3:05 p.m.', '3:21 p.m.', '3:38 p.m.', '3:54 p.m.', '4:10 p.m.', '4:26 p.m.', '4:42 p.m.', '4:58 p.m.', '5:14 p.m.', '5:30 p.m.', '5:46 p.m.', '6:02 p.m.', '6:18 p.m.', '6:34 p.m.', '6:50 p.m.', '7:06 p.m.', '7:22 p.m.', '7:38 p.m.', '7:54 p.m.', '8:10 p.m.', '8:24 p.m.', '8:40 p.m.', '8:56 p.m.', '9:12 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B043%2FP43_IMG1.PNG?alt=media&token=13a4d90c-404c-4088-909d-4fd308ac76de' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B043%2FP43_IMG2.PNG?alt=media&token=3e5d1aa0-8208-44d8-af83-d25565237fdd' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B043%2FP43_IMG3.PNG?alt=media&token=ce73b7fc-9df8-4ccd-8f37-7b94ee3e73ca' }
          ]
        },
        {
          numParada: '44',
          nameParada: 'Ancon',
          coordinates: {
            latitude: 4.453366,
            longitude: -75.235037
          },
          horariosParada: ['5:44 a.m.', '6:00 a.m.', '6:16 a.m.', '6:32 a.m.', '6:48 a.m.', '7:04 a.m.', '7:21 a.m.', '7:38 a.m.', '7:54 a.m.', '8:10 a.m.', '8:26 a.m.', '8:42 a.m.', '8:58 a.m.', '9:14 a.m.', '9:30 a.m.', '9:46 a.m.', '10:02 a.m.', '10:18 a.m.', '10:33 a.m.', '10:49 a.m.', '11:05 a.m.', '11:21 a.m.', '11:37 a.m.', '11:53 a.m.', '12:09 p.m.', '12:25 p.m.', '12:41 p.m.', '12:57 p.m.', '1:13 p.m.', '1:29 p.m.', '1:45 p.m.', '2:01 p.m.', '2:17 p.m.', '2:33 p.m.', '2:49 p.m.', '3:05 p.m.', '3:21 p.m.', '3:38 p.m.', '3:54 p.m.', '4:10 p.m.', '4:26 p.m.', '4:42 p.m.', '4:58 p.m.', '5:14 p.m.', '5:30 p.m.', '5:46 p.m.', '6:02 p.m.', '6:18 p.m.', '6:34 p.m.', '6:50 p.m.', '7:06 p.m.', '7:22 p.m.', '7:38 p.m.', '7:54 p.m.', '8:10 p.m.', '8:24 p.m.', '8:40 p.m.', '8:56 p.m.', '9:12 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B044%2FP44_IMG1.PNG?alt=media&token=2430cc4d-9253-4141-a43e-323ea0b8a906' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B044%2FP44_IMG2.PNG?alt=media&token=5d4b66cc-3244-4e26-92e6-16554383d410' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B044%2FP44_IMG3.PNG?alt=media&token=b9b5bc88-5d64-433d-821a-8e8fa8632691' }
          ]
        },
        {
          numParada: '45',
          nameParada: 'Clarita Botero',
          coordinates: {
            latitude: 4.458864,
            longitude: -75.235522
          },
          horariosParada: ['5:45 a.m.', '6:01 a.m.', '6:17 a.m.', '6:33 a.m.', '6:49 a.m.', '7:05 a.m.', '7:22 a.m.', '7:39 a.m.', '7:55 a.m.', '8:11 a.m.', '8:27 a.m.', '8:43 a.m.', '8:59 a.m.', '9:15 a.m.', '9:31 a.m.', '9:47 a.m.', '10:03 a.m.', '10:19 a.m.', '10:34 a.m.', '10:50 a.m.', '11:06 a.m.', '11:22 a.m.', '11:38 a.m.', '11:54 a.m.', '12:10 p.m.', '12:26 p.m.', '12:42 p.m.', '12:58 p.m.', '1:14 p.m.', '1:30 p.m.', '1:46 p.m.', '2:02 p.m.', '2:18 p.m.', '2:34 p.m.', '2:50 p.m.', '3:06 p.m.', '3:22 p.m.', '3:39 p.m.', '3:55 p.m.', '4:11 p.m.', '4:27 p.m.', '4:43 p.m.', '4:59 p.m.', '5:15 p.m.', '5:31 p.m.', '5:47 p.m.', '6:03 p.m.', '6:19 p.m.', '6:35 p.m.', '6:51 p.m.', '7:07 p.m.', '7:23 p.m.', '7:39 p.m.', '7:55 p.m.', '8:11 p.m.', '8:25 p.m.', '8:41 p.m.', '8:57 p.m.', '9:13 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B045%2FP45_IMG1.PNG?alt=media&token=707a53f6-d2ad-4e8f-92d8-de27c0e43915' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B045%2FP45_IMG2.PNG?alt=media&token=c92ead7a-d306-4a7c-919a-43bef337f38c' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FCa%C3%B1averal%20%E2%87%84%20Clarita%20Botero%2FParada%20N%C2%B045%2FP45_IMG3.PNG?alt=media&token=106d0240-e20a-49e2-a105-165bbd5d5c5d' }
          ]
        }
      ],
      polylineCoordinates: [
        { latitude: 4.451946, longitude: -75.186958 },
        { latitude: 4.451764, longitude: -75.187036 },
        { latitude: 4.451302, longitude: -75.186081 },
        { latitude: 4.450055, longitude: -75.185207 },
        { latitude: 4.449234, longitude: -75.184435 },
        { latitude: 4.447903, longitude: -75.183422 },
        { latitude: 4.447049, longitude: -75.182732 },
        { latitude: 4.446901, longitude: -75.182838 },
        { latitude: 4.446716, longitude: -75.183474 },
        { latitude: 4.446356, longitude: -75.184253 },
        { latitude: 4.446464, longitude: -75.185284 },
        { latitude: 4.446689, longitude: -75.186764 },
        { latitude: 4.446728, longitude: -75.187903 },
        { latitude: 4.446523, longitude: -75.189654 },
        { latitude: 4.446678, longitude: -75.190064 },
        { latitude: 4.446886, longitude: -75.190349 },
        { latitude: 4.446803, longitude: -75.190633 },
        { latitude: 4.446489, longitude: -75.190728 },
        { latitude: 4.445032, longitude: -75.191150 },
        { latitude: 4.444920, longitude: -75.191137 },
        { latitude: 4.444327, longitude: -75.191690 },
        { latitude: 4.443073, longitude: -75.191935 },
        { latitude: 4.442156, longitude: -75.191975 },
        { latitude: 4.442418, longitude: -75.195603 },
        { latitude: 4.442268, longitude: -75.198851 },
        { latitude: 4.441804, longitude: -75.202047 },
        { latitude: 4.439985, longitude: -75.201607 },
        { latitude: 4.436665, longitude: -75.200504 },
        { latitude: 4.436315, longitude: -75.201690 },
        { latitude: 4.435304, longitude: -75.204657 },
        { latitude: 4.434847, longitude: -75.204956 },
        { latitude: 4.433616, longitude: -75.205547 },
        { latitude: 4.433148, longitude: -75.206838 },
        { latitude: 4.432213, longitude: -75.208810 },
        { latitude: 4.431798, longitude: -75.209559 },
        { latitude: 4.433307, longitude: -75.210296 },
        { latitude: 4.434534, longitude: -75.210998 },
        { latitude: 4.434998, longitude: -75.211527 },
        { latitude: 4.435584, longitude: -75.212165 },
        { latitude: 4.436741, longitude: -75.214219 },
        { latitude: 4.437186, longitude: -75.215030 },
        { latitude: 4.438687, longitude: -75.218487 },
        { latitude: 4.438910, longitude: -75.219348 },
        { latitude: 4.439209, longitude: -75.220216 },
        { latitude: 4.439872, longitude: -75.221973 },
        { latitude: 4.440024, longitude: -75.223020 },
        { latitude: 4.440356, longitude: -75.225918 },
        { latitude: 4.440440, longitude: -75.226654 },
        { latitude: 4.440704, longitude: -75.228914 },
        { latitude: 4.441075, longitude: -75.230234 },
        { latitude: 4.441446, longitude: -75.231221 },
        { latitude: 4.441733, longitude: -75.232108 },
        { latitude: 4.443404, longitude: -75.235590 },
        { latitude: 4.444524, longitude: -75.237722 },
        { latitude: 4.445742, longitude: -75.240453 },
        { latitude: 4.446158, longitude: -75.240188 },
        { latitude: 4.446800, longitude: -75.239905 },
        { latitude: 4.446801, longitude: -75.238982 },
        { latitude: 4.447169, longitude: -75.238435 },
        { latitude: 4.447371, longitude: -75.238381 },
        { latitude: 4.447489, longitude: -75.238542 },
        { latitude: 4.447971, longitude: -75.238452 },
        { latitude: 4.448142, longitude: -75.238139 },
        { latitude: 4.448793, longitude: -75.237939 },
        { latitude: 4.448603, longitude: -75.237328 },
        { latitude: 4.448683, longitude: -75.237201 },
        { latitude: 4.449581, longitude: -75.236920 },
        { latitude: 4.449939, longitude: -75.236964 },
        { latitude: 4.450235, longitude: -75.237047 },
        { latitude: 4.450484, longitude: -75.236810 },
        { latitude: 4.450714, longitude: -75.236277 },
        { latitude: 4.451247, longitude: -75.236038 },
        { latitude: 4.452942, longitude: -75.235962 },
        { latitude: 4.453366, longitude: -75.235037 },
        { latitude: 4.453902, longitude: -75.235044 },
        { latitude: 4.454452, longitude: -75.234946 },
        { latitude: 4.455084, longitude: -75.235022 },
        { latitude: 4.455402, longitude: -75.235142 },
        { latitude: 4.455589, longitude: -75.235137 },
        { latitude: 4.455609, longitude: -75.234932 },
        { latitude: 4.455420, longitude: -75.234645 },
        { latitude: 4.455428, longitude: -75.234543 },
        { latitude: 4.455962, longitude: -75.234736 },
        { latitude: 4.456386, longitude: -75.234767 },
        { latitude: 4.456985, longitude: -75.234584 },
        { latitude: 4.457364, longitude: -75.234608 },
        { latitude: 4.457781, longitude: -75.234877 },
        { latitude: 4.458416, longitude: -75.235312 },
        { latitude: 4.458864, longitude: -75.235522 }
      ]
    },
    {
      nameRuta: 'Delicias ⇄ Belén',
      numRuta: '1',
      horarioServicio: '5:00 a.m. - 9:00 p.m.',
      paradasRuta: [
        {
          numParada: '1',
          nameParada: 'Terminal Barrio Delicias',
          coordinates: {
            latitude: 4.462328,
            longitude: -75.202384
          },
          horariosParada: ['5:00 a.m.', '5:20 a.m.', '5:40 a.m.', '6:00 a.m.', '6:20 a.m.', '6:40 a.m.', '7:00 a.m.', '7:20 a.m.', '7:40 a.m.', '8:00 a.m.', '8:20 a.m.', '8:40 a.m.', '9:00 a.m.', '9:20 a.m.', '9:40 a.m.', '10:00 a.m.', '10:20 a.m.', '10:40 a.m.', '11:00 a.m.', '11:20 a.m.', '11:40 a.m.', '12:00 p.m.', '12:20 p.m.', '12:40 p.m.', '1:00 p.m.', '1:20 p.m.', '1:40 p.m.', '2:00 p.m.', '2:20 p.m.', '2:40 p.m.', '3:00 p.m.', '3:20 p.m.', '3:40 p.m.', '4:00 p.m.', '4:20 p.m.', '4:40 p.m.', '5:00 p.m.', '5:20 p.m.', '5:40 p.m.', '6:00 p.m.', '6:20 p.m.', '6:40 p.m.', '7:00 p.m.', '7:20 p.m.', '7:40 p.m.', '8:00 p.m.', '8:20 p.m.', '8:40 p.m.', '9:00 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B01%2FP1_IMG1.PNG?alt=media&token=fccd079f-d5e4-46a4-932d-f72dee7faaed' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B01%2FP1_IMG2.PNG?alt=media&token=cb27fa3a-3f14-4124-842a-f58f6e4b2e73' }
          ]
        },
        {
          numParada: '2',
          nameParada: 'Cll. 73 X Cra. 36',
          coordinates: {
            latitude: 4.461306,
            longitude: -75.201215
          },
          horariosParada: ['5:00 a.m.', '5:20 a.m.', '5:40 a.m.', '6:00 a.m.', '6:20 a.m.', '6:40 a.m.', '7:00 a.m.', '7:20 a.m.', '7:40 a.m.', '8:00 a.m.', '8:20 a.m.', '8:40 a.m.', '9:00 a.m.', '9:20 a.m.', '9:40 a.m.', '10:00 a.m.', '10:20 a.m.', '10:40 a.m.', '11:00 a.m.', '11:20 a.m.', '11:40 a.m.', '12:00 p.m.', '12:20 p.m.', '12:40 p.m.', '1:00 p.m.', '1:20 p.m.', '1:40 p.m.', '2:00 p.m.', '2:20 p.m.', '2:40 p.m.', '3:00 p.m.', '3:20 p.m.', '3:40 p.m.', '4:00 p.m.', '4:20 p.m.', '4:40 p.m.', '5:00 p.m.', '5:20 p.m.', '5:40 p.m.', '6:00 p.m.', '6:20 p.m.', '6:40 p.m.', '7:00 p.m.', '7:20 p.m.', '7:40 p.m.', '8:00 p.m.', '8:20 p.m.', '8:40 p.m.', '9:00 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B02%2FP2_IMG1.PNG?alt=media&token=2d00e5e2-4c23-46fd-b7dd-88c69d841a6a' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B02%2FP2_IMG2.PNG?alt=media&token=3a81f05f-a62d-45ff-bfa4-002112f2d0a4' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B02%2FP2_IMG3.PNG?alt=media&token=8a350aa4-b4ec-48d4-aaec-6837e0c2e36d' }
          ]
        },
        {
          numParada: '3',
          nameParada: 'Cll. 73 X Cra. 36',
          coordinates: {
            latitude: 4.459194,
            longitude: -75.200549
          },
          horariosParada: ['5:01 a.m.', '5:21 a.m.', '5:41 a.m.', '6:01 a.m.', '6:21 a.m.', '6:41 a.m.', '7:01 a.m.', '7:21 a.m.', '7:41 a.m.', '8:01 a.m.', '8:21 a.m.', '8:41 a.m.', '9:01 a.m.', '9:21 a.m.', '9:41 a.m.', '10:01 a.m.', '10:21 a.m.', '10:41 a.m.', '11:01 a.m.', '11:21 a.m.', '11:41 a.m.', '12:01 p.m.', '12:21 p.m.', '12:41 p.m.', '1:01 p.m.', '1:21 p.m.', '1:41 p.m.', '2:01 p.m.', '2:21 p.m.', '2:41 p.m.', '3:01 p.m.', '3:21 p.m.', '3:41 p.m.', '4:01 p.m.', '4:21 p.m.', '4:41 p.m.', '5:01 p.m.', '5:21 p.m.', '5:41 p.m.', '6:01 p.m.', '6:21 p.m.', '6:41 p.m.', '7:01 p.m.', '7:21 p.m.', '7:41 p.m.', '8:01 p.m.', '8:21 p.m.', '8:41 p.m.', '9:01 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B03%2FP3_IMG1.PNG?alt=media&token=76556d6a-6d60-4dad-8658-fb0b34232307' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B03%2FP3_IMG2.PNG?alt=media&token=23297942-0ecf-4464-8720-5136f997a738' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B03%2FP3_IMG3.PNG?alt=media&token=a919113b-78f9-45fa-b424-64fe2085bd56' }
          ]
        },
        {
          numParada: '4',
          nameParada: 'Cll. 67 X Cra. 28',
          coordinates: {
            latitude: 4.455337,
            longitude: -75.202358
          },
          horariosParada: ['5:02 a.m.', '5:22 a.m.', '5:42 a.m.', '6:02 a.m.', '6:22 a.m.', '6:42 a.m.', '7:02 a.m.', '7:22 a.m.', '7:42 a.m.', '8:02 a.m.', '8:22 a.m.', '8:42 a.m.', '9:02 a.m.', '9:22 a.m.', '9:42 a.m.', '10:02 a.m.', '10:22 a.m.', '10:42 a.m.', '11:02 a.m.', '11:22 a.m.', '11:42 a.m.', '12:02 p.m.', '12:22 p.m.', '12:42 p.m.', '1:02 p.m.', '1:22 p.m.', '1:42 p.m.', '2:02 p.m.', '2:22 p.m.', '2:42 p.m.', '3:02 p.m.', '3:22 p.m.', '3:42 p.m.', '4:02 p.m.', '4:22 p.m.', '4:42 p.m.', '5:02 p.m.', '5:22 p.m.', '5:42 p.m.', '6:02 p.m.', '6:22 p.m.', '6:42 p.m.', '7:02 p.m.', '7:22 p.m.', '7:42 p.m.', '8:02 p.m.', '8:22 p.m.', '8:42 p.m.', '9:02 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B04%2FP4_IMG1.PNG?alt=media&token=960ea182-c568-41ca-8275-a9207a2fad41' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B04%2FP4_IMG2.PNG?alt=media&token=424c4c22-2494-4f10-ab6f-8c4bcdc68b7e' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B04%2FP4_IMG3.PNG?alt=media&token=79dcb37f-37fc-4677-8e36-efe6b8c495df' }
          ]
        },
        {
          numParada: '5',
          nameParada: 'Cll. 67 X Cra. 23',
          coordinates: {
            latitude: 4.451952,
            longitude: -75.200565
          },
          horariosParada: ['5:03 a.m.', '5:23 a.m.', '5:43 a.m.', '6:03 a.m.', '6:23 a.m.', '6:43 a.m.', '7:03 a.m.', '7:23 a.m.', '7:43 a.m.', '8:03 a.m.', '8:23 a.m.', '8:43 a.m.', '9:03 a.m.', '9:23 a.m.', '9:43 a.m.', '10:03 a.m.', '10:23 a.m.', '10:43 a.m.', '11:03 a.m.', '11:23 a.m.', '11:43 a.m.', '12:03 p.m.', '12:23 p.m.', '12:43 p.m.', '1:03 p.m.', '1:23 p.m.', '1:43 p.m.', '2:03 p.m.', '2:23 p.m.', '2:43 p.m.', '3:03 p.m.', '3:23 p.m.', '3:43 p.m.', '4:03 p.m.', '4:23 p.m.', '4:43 p.m.', '5:03 p.m.', '5:23 p.m.', '5:43 p.m.', '6:03 p.m.', '6:23 p.m.', '6:43 p.m.', '7:03 p.m.', '7:23 p.m.', '7:43 p.m.', '8:03 p.m.', '8:23 p.m.', '8:43 p.m.', '9:03 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B05%2FP5_IMG1.PNG?alt=media&token=f3c0b673-918c-432e-9bc9-2aff326588d0' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B05%2FP5_IMG2.PNG?alt=media&token=c2753812-ee30-41d9-80a7-d5e7585c26e7' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B05%2FP5_IMG3.PNG?alt=media&token=c730b98b-c0bc-4349-af5d-9e999f9bf111' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B05%2FP5_IMG4.PNG?alt=media&token=5647c21a-bb82-43f8-8420-4ad90016d6e0' }
          ]
        },
        {
          numParada: '6',
          nameParada: 'Cll. 64 X Cra. 23',
          coordinates: {
            latitude: 4.451040,
            longitude: -75.202549
          },
          horariosParada: ['5:04 a.m.', '5:24 a.m.', '5:44 a.m.', '6:04 a.m.', '6:24 a.m.', '6:44 a.m.', '7:04 a.m.', '7:24 a.m.', '7:44 a.m.', '8:04 a.m.', '8:24 a.m.', '8:44 a.m.', '9:04 a.m.', '9:24 a.m.', '9:44 a.m.', '10:04 a.m.', '10:24 a.m.', '10:44 a.m.', '11:04 a.m.', '11:24 a.m.', '11:44 a.m.', '12:04 p.m.', '12:24 p.m.', '12:44 p.m.', '1:04 p.m.', '1:24 p.m.', '1:44 p.m.', '2:04 p.m.', '2:24 p.m.', '2:44 p.m.', '3:04 p.m.', '3:24 p.m.', '3:44 p.m.', '4:04 p.m.', '4:24 p.m.', '4:44 p.m.', '5:04 p.m.', '5:24 p.m.', '5:44 p.m.', '6:04 p.m.', '6:24 p.m.', '6:44 p.m.', '7:04 p.m.', '7:24 p.m.', '7:44 p.m.', '8:04 p.m.', '8:24 p.m.', '8:44 p.m.', '9:04 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B06%2FP6_IMG1.PNG?alt=media&token=a7cc28f2-0037-439c-aac2-7decb6935482' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B06%2FP6_IMG2.PNG?alt=media&token=8a33f363-6b0b-4809-a38e-69d3af72d3f8' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B06%2FP6_IMG3.PNG?alt=media&token=c47930ff-d762-4c10-a58d-be1993452fe1' }
          ]
        },
        {
          numParada: '7',
          nameParada: 'Calle 64 21a1',
          coordinates: {
            latitude: 4.449770,
            longitude: -75.201923
          },
          horariosParada: ['5:04 a.m.', '5:24 a.m.', '5:44 a.m.', '6:04 a.m.', '6:24 a.m.', '6:44 a.m.', '7:04 a.m.', '7:24 a.m.', '7:44 a.m.', '8:04 a.m.', '8:24 a.m.', '8:44 a.m.', '9:04 a.m.', '9:24 a.m.', '9:44 a.m.', '10:04 a.m.', '10:24 a.m.', '10:44 a.m.', '11:04 a.m.', '11:24 a.m.', '11:44 a.m.', '12:04 p.m.', '12:24 p.m.', '12:44 p.m.', '1:04 p.m.', '1:24 p.m.', '1:44 p.m.', '2:04 p.m.', '2:24 p.m.', '2:44 p.m.', '3:04 p.m.', '3:24 p.m.', '3:44 p.m.', '4:04 p.m.', '4:24 p.m.', '4:44 p.m.', '5:04 p.m.', '5:24 p.m.', '5:44 p.m.', '6:04 p.m.', '6:24 p.m.', '6:44 p.m.', '7:04 p.m.', '7:24 p.m.', '7:44 p.m.', '8:04 p.m.', '8:24 p.m.', '8:44 p.m.', '9:04 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B07%2FP7_IMG1.PNG?alt=media&token=82730a47-3e2a-4bc6-a26d-8a44e027b895' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B07%2FP7_IMG2.PNG?alt=media&token=273421c0-abfe-4215-9589-9d620f16e7e1' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B07%2FP7_IMG3.PNG?alt=media&token=a6042859-53ac-4905-b68e-950919ecc260' }
          ]
        },
        {
          numParada: '8',
          nameParada: 'Calle 64 201',
          coordinates: {
            latitude: 4.448861,
            longitude: -75.201547
          },
          horariosParada: ['5:04 a.m.', '5:24 a.m.', '5:44 a.m.', '6:04 a.m.', '6:24 a.m.', '6:44 a.m.', '7:04 a.m.', '7:24 a.m.', '7:44 a.m.', '8:04 a.m.', '8:24 a.m.', '8:44 a.m.', '9:04 a.m.', '9:24 a.m.', '9:44 a.m.', '10:04 a.m.', '10:24 a.m.', '10:44 a.m.', '11:04 a.m.', '11:24 a.m.', '11:44 a.m.', '12:04 p.m.', '12:24 p.m.', '12:44 p.m.', '1:04 p.m.', '1:24 p.m.', '1:44 p.m.', '2:04 p.m.', '2:24 p.m.', '2:44 p.m.', '3:04 p.m.', '3:24 p.m.', '3:44 p.m.', '4:04 p.m.', '4:24 p.m.', '4:44 p.m.', '5:04 p.m.', '5:24 p.m.', '5:44 p.m.', '6:04 p.m.', '6:24 p.m.', '6:44 p.m.', '7:04 p.m.', '7:24 p.m.', '7:44 p.m.', '8:04 p.m.', '8:24 p.m.', '8:44 p.m.', '9:04 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B08%2FP8_IMG1.PNG?alt=media&token=7218b095-a5d7-4da2-8ed7-698b9690bb06' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B08%2FP8_IMG2.PNG?alt=media&token=f0a7f429-55d2-45d2-a5ae-9acf9d1b6f1a' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B08%2FP8_IMG3.PNG?alt=media&token=977b521f-4856-4a38-865d-5f5b7fef817d' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B08%2FP8_IMG4.PNG?alt=media&token=4987a05d-022d-472b-b566-d05fe89e2d58' }
          ]
        },
        {
          numParada: '9',
          nameParada: 'Calle 64 201',
          coordinates: {
            latitude: 4.447942,
            longitude: -75.201206
          },
          horariosParada: ['5:04 a.m.', '5:24 a.m.', '5:44 a.m.', '6:04 a.m.', '6:24 a.m.', '6:44 a.m.', '7:04 a.m.', '7:24 a.m.', '7:44 a.m.', '8:04 a.m.', '8:24 a.m.', '8:44 a.m.', '9:04 a.m.', '9:24 a.m.', '9:44 a.m.', '10:04 a.m.', '10:24 a.m.', '10:44 a.m.', '11:04 a.m.', '11:24 a.m.', '11:44 a.m.', '12:04 p.m.', '12:24 p.m.', '12:44 p.m.', '1:04 p.m.', '1:24 p.m.', '1:44 p.m.', '2:04 p.m.', '2:24 p.m.', '2:44 p.m.', '3:04 p.m.', '3:24 p.m.', '3:44 p.m.', '4:04 p.m.', '4:24 p.m.', '4:44 p.m.', '5:04 p.m.', '5:24 p.m.', '5:44 p.m.', '6:04 p.m.', '6:24 p.m.', '6:44 p.m.', '7:04 p.m.', '7:24 p.m.', '7:44 p.m.', '8:04 p.m.', '8:24 p.m.', '8:44 p.m.', '9:04 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B09%2FP9_IMG1.PNG?alt=media&token=f57238dd-3ac0-4bc1-bfef-ce69c8efd25a' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B09%2FP9_IMG2.PNG?alt=media&token=83382713-dff2-4d48-9869-ae3f53849093' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B09%2FP9_IMG3.PNG?alt=media&token=8e80ba37-e7e7-4e6f-9d75-bf2abf89fa9e' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B09%2FP9_IMG4.PNG?alt=media&token=7a664e6c-0227-4ea3-9c9d-3638342b4c31' }
          ]
        },
        {
          numParada: '10',
          nameParada: 'Carrera 20 61-33',
          coordinates: {
            latitude: 4.447667,
            longitude: -75.202341
          },
          horariosParada: ['5:05 a.m.', '5:25 a.m.', '5:45 a.m.', '6:05 a.m.', '6:25 a.m.', '6:45 a.m.', '7:05 a.m.', '7:25 a.m.', '7:45 a.m.', '8:05 a.m.', '8:25 a.m.', '8:45 a.m.', '9:05 a.m.', '9:25 a.m.', '9:45 a.m.', '10:05 a.m.', '10:25 a.m.', '10:45 a.m.', '11:05 a.m.', '11:25 a.m.', '11:45 a.m.', '12:05 p.m.', '12:25 p.m.', '12:45 p.m.', '1:05 p.m.', '1:25 p.m.', '1:45 p.m.', '2:05 p.m.', '2:25 p.m.', '2:45 p.m.', '3:05 p.m.', '3:25 p.m.', '3:45 p.m.', '4:05 p.m.', '4:25 p.m.', '4:45 p.m.', '5:05 p.m.', '5:25 p.m.', '5:45 p.m.', '6:05 p.m.', '6:25 p.m.', '6:45 p.m.', '7:05 p.m.', '7:25 p.m.', '7:45 p.m.', '8:05 p.m.', '8:25 p.m.', '8:45 p.m.', '9:05 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B010%2FP10_IMG1.PNG?alt=media&token=75333219-957b-4d8b-b159-a34acfa401c6' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B010%2FP10_IMG2.PNG?alt=media&token=85b568b5-ae1a-476f-90eb-4104628be492' }
          ]
        },
        {
          numParada: '11',
          nameParada: 'Av. Ambalá X Calle 61',
          coordinates: {
            latitude: 4.447743,
            longitude: -75.203604
          },
          horariosParada: ['5:05 a.m.', '5:25 a.m.', '5:45 a.m.', '6:05 a.m.', '6:25 a.m.', '6:45 a.m.', '7:05 a.m.', '7:25 a.m.', '7:45 a.m.', '8:05 a.m.', '8:25 a.m.', '8:45 a.m.', '9:05 a.m.', '9:25 a.m.', '9:45 a.m.', '10:05 a.m.', '10:25 a.m.', '10:45 a.m.', '11:05 a.m.', '11:25 a.m.', '11:45 a.m.', '12:05 p.m.', '12:25 p.m.', '12:45 p.m.', '1:05 p.m.', '1:25 p.m.', '1:45 p.m.', '2:05 p.m.', '2:25 p.m.', '2:45 p.m.', '3:05 p.m.', '3:25 p.m.', '3:45 p.m.', '4:05 p.m.', '4:25 p.m.', '4:45 p.m.', '5:05 p.m.', '5:25 p.m.', '5:45 p.m.', '6:05 p.m.', '6:25 p.m.', '6:45 p.m.', '7:05 p.m.', '7:25 p.m.', '7:45 p.m.', '8:05 p.m.', '8:25 p.m.', '8:45 p.m.', '9:05 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B011%2FP11_IMG1.PNG?alt=media&token=d6df31f4-5d1c-4d04-8c87-32351ef1c502' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B011%2FP11_IMG2.PNG?alt=media&token=74dcf457-a913-4188-84e6-fab125f26d01' }
          ]
        },
        {
          numParada: '12',
          nameParada: 'Carrera 20 61-33',
          coordinates: {
            latitude: 4.447586,
            longitude: -75.204141
          },
          horariosParada: ['5:05 a.m.', '5:25 a.m.', '5:45 a.m.', '6:05 a.m.', '6:25 a.m.', '6:45 a.m.', '7:05 a.m.', '7:25 a.m.', '7:45 a.m.', '8:05 a.m.', '8:25 a.m.', '8:45 a.m.', '9:05 a.m.', '9:25 a.m.', '9:45 a.m.', '10:05 a.m.', '10:25 a.m.', '10:45 a.m.', '11:05 a.m.', '11:25 a.m.', '11:45 a.m.', '12:05 p.m.', '12:25 p.m.', '12:45 p.m.', '1:05 p.m.', '1:25 p.m.', '1:45 p.m.', '2:05 p.m.', '2:25 p.m.', '2:45 p.m.', '3:05 p.m.', '3:25 p.m.', '3:45 p.m.', '4:05 p.m.', '4:25 p.m.', '4:45 p.m.', '5:05 p.m.', '5:25 p.m.', '5:45 p.m.', '6:05 p.m.', '6:25 p.m.', '6:45 p.m.', '7:05 p.m.', '7:25 p.m.', '7:45 p.m.', '8:05 p.m.', '8:25 p.m.', '8:45 p.m.', '9:05 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B012%2FP12_IMG1.PNG?alt=media&token=10836160-3df4-4cbc-9d9c-6a2f90f81700' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B012%2FP12_IMG2.PNG?alt=media&token=c88ce9cc-1841-4f98-866a-7eb9098d639a' }
          ]
        },
        {
          numParada: '13',
          nameParada: 'Carrera 20 61-33',
          coordinates: {
            latitude: 4.447343,
            longitude: -75.205300
          },
          horariosParada: ['5:06 a.m.', '5:26 a.m.', '5:46 a.m.', '6:06 a.m.', '6:26 a.m.', '6:46 a.m.', '7:06 a.m.', '7:26 a.m.', '7:46 a.m.', '8:06 a.m.', '8:26 a.m.', '8:46 a.m.', '9:06 a.m.', '9:26 a.m.', '9:46 a.m.', '10:06 a.m.', '10:26 a.m.', '10:46 a.m.', '11:06 a.m.', '11:26 a.m.', '11:46 a.m.', '12:06 p.m.', '12:26 p.m.', '12:46 p.m.', '1:06 p.m.', '1:26 p.m.', '1:46 p.m.', '2:06 p.m.', '2:26 p.m.', '2:46 p.m.', '3:06 p.m.', '3:26 p.m.', '3:46 p.m.', '4:06 p.m.', '4:26 p.m.', '4:46 p.m.', '5:06 p.m.', '5:26 p.m.', '5:46 p.m.', '6:06 p.m.', '6:26 p.m.', '6:46 p.m.', '7:06 p.m.', '7:26 p.m.', '7:46 p.m.', '8:06 p.m.', '8:26 p.m.', '8:46 p.m.', '9:06 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B013%2FP13_IMG1.PNG?alt=media&token=c5dbd180-9dcd-457a-9f23-8be710f1eadb' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B013%2FP13_IMG2.PNG?alt=media&token=92abbdee-a131-485f-bd07-8ed02571e328' }
          ]
        },
        {
          numParada: '14',
          nameParada: 'Carrera 20',
          coordinates: {
            latitude: 4.446506,
            longitude: -75.206626
          },
          horariosParada: ['5:06 a.m.', '5:26 a.m.', '5:46 a.m.', '6:06 a.m.', '6:26 a.m.', '6:46 a.m.', '7:06 a.m.', '7:26 a.m.', '7:46 a.m.', '8:06 a.m.', '8:26 a.m.', '8:46 a.m.', '9:06 a.m.', '9:26 a.m.', '9:46 a.m.', '10:06 a.m.', '10:26 a.m.', '10:46 a.m.', '11:06 a.m.', '11:26 a.m.', '11:46 a.m.', '12:06 p.m.', '12:26 p.m.', '12:46 p.m.', '1:06 p.m.', '1:26 p.m.', '1:46 p.m.', '2:06 p.m.', '2:26 p.m.', '2:46 p.m.', '3:06 p.m.', '3:26 p.m.', '3:46 p.m.', '4:06 p.m.', '4:26 p.m.', '4:46 p.m.', '5:06 p.m.', '5:26 p.m.', '5:46 p.m.', '6:06 p.m.', '6:26 p.m.', '6:46 p.m.', '7:06 p.m.', '7:26 p.m.', '7:46 p.m.', '8:06 p.m.', '8:26 p.m.', '8:46 p.m.', '9:06 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B014%2FP14_IMG1.PNG?alt=media&token=9ba07b40-726a-4907-a224-1fa1932106d8' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B014%2FP14_IMG2.PNG?alt=media&token=da84a96d-8d95-43b8-b0f8-224d20023d2d' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B014%2FP14_IMG3.PNG?alt=media&token=72acd205-e438-43bf-8dbe-68d31400d92f' }
          ]
        },
        {
          numParada: '15',
          nameParada: 'Ruta 1 Glorieta Centro Comercial La Estación',
          coordinates: {
            latitude: 4.446484,
            longitude: -75.205242
          },
          horariosParada: ['5:06 a.m.', '5:26 a.m.', '5:46 a.m.', '6:06 a.m.', '6:26 a.m.', '6:46 a.m.', '7:06 a.m.', '7:26 a.m.', '7:46 a.m.', '8:06 a.m.', '8:26 a.m.', '8:46 a.m.', '9:06 a.m.', '9:26 a.m.', '9:46 a.m.', '10:06 a.m.', '10:26 a.m.', '10:46 a.m.', '11:06 a.m.', '11:26 a.m.', '11:46 a.m.', '12:06 p.m.', '12:26 p.m.', '12:46 p.m.', '1:06 p.m.', '1:26 p.m.', '1:46 p.m.', '2:06 p.m.', '2:26 p.m.', '2:46 p.m.', '3:06 p.m.', '3:26 p.m.', '3:46 p.m.', '4:06 p.m.', '4:26 p.m.', '4:46 p.m.', '5:06 p.m.', '5:26 p.m.', '5:46 p.m.', '6:06 p.m.', '6:26 p.m.', '6:46 p.m.', '7:06 p.m.', '7:26 p.m.', '7:46 p.m.', '8:06 p.m.', '8:26 p.m.', '8:46 p.m.', '9:06 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B015%2FP15_IMG1.PNG?alt=media&token=a2328106-4d2e-458c-8c71-876121a54e9d' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B015%2FP15_IMG2.PNG?alt=media&token=b1467f18-197b-43e3-b9ba-efd2048e022d' }
          ]
        },
        {
          numParada: '16',
          nameParada: 'Carrera 20 61-33',
          coordinates: {
            latitude: 4.447068,
            longitude: -75.202932
          },
          horariosParada: ['5:07 a.m.', '5:27 a.m.', '5:47 a.m.', '6:07 a.m.', '6:27 a.m.', '6:47 a.m.', '7:07 a.m.', '7:27 a.m.', '7:47 a.m.', '8:07 a.m.', '8:27 a.m.', '8:47 a.m.', '9:07 a.m.', '9:27 a.m.', '9:47 a.m.', '10:07 a.m.', '10:27 a.m.', '10:47 a.m.', '11:07 a.m.', '11:27 a.m.', '11:47 a.m.', '12:07 p.m.', '12:27 p.m.', '12:47 p.m.', '1:07 p.m.', '1:27 p.m.', '1:47 p.m.', '2:07 p.m.', '2:27 p.m.', '2:47 p.m.', '3:07 p.m.', '3:27 p.m.', '3:47 p.m.', '4:07 p.m.', '4:27 p.m.', '4:47 p.m.', '5:07 p.m.', '5:27 p.m.', '5:47 p.m.', '6:07 p.m.', '6:27 p.m.', '6:47 p.m.', '7:07 p.m.', '7:27 p.m.', '7:47 p.m.', '8:07 p.m.', '8:27 p.m.', '8:47 p.m.', '9:07 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B016%2FP16_IMG1.PNG?alt=media&token=d455605a-eab2-4c8c-90d1-3b53df907d2e' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B016%2FP16_IMG2.PNG?alt=media&token=8f13ce96-ad86-40e9-9ea0-18b3ff2f18a0' }
          ]
        },
        {
          numParada: '17',
          nameParada: 'Carrera 20 622',
          coordinates: {
            latitude: 4.447487,
            longitude: -75.201949
          },
          horariosParada: ['5:07 a.m.', '5:27 a.m.', '5:47 a.m.', '6:07 a.m.', '6:27 a.m.', '6:47 a.m.', '7:07 a.m.', '7:27 a.m.', '7:47 a.m.', '8:07 a.m.', '8:27 a.m.', '8:47 a.m.', '9:07 a.m.', '9:27 a.m.', '9:47 a.m.', '10:07 a.m.', '10:27 a.m.', '10:47 a.m.', '11:07 a.m.', '11:27 a.m.', '11:47 a.m.', '12:07 p.m.', '12:27 p.m.', '12:47 p.m.', '1:07 p.m.', '1:27 p.m.', '1:47 p.m.', '2:07 p.m.', '2:27 p.m.', '2:47 p.m.', '3:07 p.m.', '3:27 p.m.', '3:47 p.m.', '4:07 p.m.', '4:27 p.m.', '4:47 p.m.', '5:07 p.m.', '5:27 p.m.', '5:47 p.m.', '6:07 p.m.', '6:27 p.m.', '6:47 p.m.', '7:07 p.m.', '7:27 p.m.', '7:47 p.m.', '8:07 p.m.', '8:27 p.m.', '8:47 p.m.', '9:07 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B017%2FP17_IMG1.PNG?alt=media&token=53997e2d-d17c-43cf-bdd5-c7656a53a8ed' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B017%2FP17_IMG2.PNG?alt=media&token=9fed7838-4d22-4275-8acd-26f5bf017ba7' }
          ]
        },
        {
          numParada: '18',
          nameParada: 'Semaro Av. Ambalá',
          coordinates: {
            latitude: 4.447680,
            longitude: -75.200185
          },
          horariosParada: ['5:08 a.m.', '5:28 a.m.', '5:48 a.m.', '6:08 a.m.', '6:28 a.m.', '6:48 a.m.', '7:08 a.m.', '7:28 a.m.', '7:48 a.m.', '8:08 a.m.', '8:28 a.m.', '8:48 a.m.', '9:08 a.m.', '9:28 a.m.', '9:48 a.m.', '10:08 a.m.', '10:28 a.m.', '10:48 a.m.', '11:08 a.m.', '11:28 a.m.', '11:48 a.m.', '12:08 p.m.', '12:28 p.m.', '12:48 p.m.', '1:08 p.m.', '1:28 p.m.', '1:48 p.m.', '2:08 p.m.', '2:28 p.m.', '2:48 p.m.', '3:08 p.m.', '3:28 p.m.', '3:48 p.m.', '4:08 p.m.', '4:28 p.m.', '4:48 p.m.', '5:08 p.m.', '5:28 p.m.', '5:48 p.m.', '6:08 p.m.', '6:28 p.m.', '6:48 p.m.', '7:08 p.m.', '7:28 p.m.', '7:48 p.m.', '8:08 p.m.', '8:28 p.m.', '8:48 p.m.', '9:08 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B018%2FP18_IMG1.PNG?alt=media&token=2d64bf02-0e8d-44e1-92a9-6addc7433390' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B018%2FP18_IMG2.PNG?alt=media&token=f0999057-4541-416a-88e2-8b7e9465f40b' }
          ]
        },
        {
          numParada: '19',
          nameParada: 'Carrera 20 69a110',
          coordinates: {
            latitude: 4.447667,
            longitude: -75.199017
          },
          horariosParada: ['5:08 a.m.', '5:28 a.m.', '5:48 a.m.', '6:08 a.m.', '6:28 a.m.', '6:48 a.m.', '7:08 a.m.', '7:28 a.m.', '7:48 a.m.', '8:08 a.m.', '8:28 a.m.', '8:48 a.m.', '9:08 a.m.', '9:28 a.m.', '9:48 a.m.', '10:08 a.m.', '10:28 a.m.', '10:48 a.m.', '11:08 a.m.', '11:28 a.m.', '11:48 a.m.', '12:08 p.m.', '12:28 p.m.', '12:48 p.m.', '1:08 p.m.', '1:28 p.m.', '1:48 p.m.', '2:08 p.m.', '2:28 p.m.', '2:48 p.m.', '3:08 p.m.', '3:28 p.m.', '3:48 p.m.', '4:08 p.m.', '4:28 p.m.', '4:48 p.m.', '5:08 p.m.', '5:28 p.m.', '5:48 p.m.', '6:08 p.m.', '6:28 p.m.', '6:48 p.m.', '7:08 p.m.', '7:28 p.m.', '7:48 p.m.', '8:08 p.m.', '8:28 p.m.', '8:48 p.m.', '9:08 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B019%2FP19_IMG1.PNG?alt=media&token=656697fc-cddb-4f1e-b962-d6e1ad488c51' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B019%2FP19_IMG2.PNG?alt=media&token=ef6c3266-2273-4011-b724-78edd6fe1172' }
          ]
        },
        {
          numParada: '20',
          nameParada: 'Av. Ambalá X Calle 69',
          coordinates: {
            latitude: 4.447703,
            longitude: -75.197257
          },
          horariosParada: ['5:09 a.m.', '5:29 a.m.', '5:49 a.m.', '6:09 a.m.', '6:29 a.m.', '6:49 a.m.', '7:09 a.m.', '7:29 a.m.', '7:49 a.m.', '8:09 a.m.', '8:29 a.m.', '8:49 a.m.', '9:09 a.m.', '9:29 a.m.', '9:49 a.m.', '10:09 a.m.', '10:29 a.m.', '10:49 a.m.', '11:09 a.m.', '11:29 a.m.', '11:49 a.m.', '12:09 p.m.', '12:29 p.m.', '12:49 p.m.', '1:09 p.m.', '1:29 p.m.', '1:49 p.m.', '2:09 p.m.', '2:29 p.m.', '2:49 p.m.', '3:09 p.m.', '3:29 p.m.', '3:49 p.m.', '4:09 p.m.', '4:29 p.m.', '4:49 p.m.', '5:09 p.m.', '5:29 p.m.', '5:49 p.m.', '6:09 p.m.', '6:29 p.m.', '6:49 p.m.', '7:09 p.m.', '7:29 p.m.', '7:49 p.m.', '8:09 p.m.', '8:29 p.m.', '8:49 p.m.', '9:09 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B020%2FP20_IMG1.PNG?alt=media&token=9d752e0a-d111-47f8-aeb0-669b71bdcaa1' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B020%2FP20_IMG2.PNG?alt=media&token=8bd7b6a5-f003-4400-a8f7-f830a4156b12' }
          ]
        },
        {
          numParada: '21',
          nameParada: 'Carrera 12 69-232',
          coordinates: {
            latitude: 4.447635,
            longitude: -75.195922
          },
          horariosParada: ['5:09 a.m.', '5:29 a.m.', '5:49 a.m.', '6:09 a.m.', '6:29 a.m.', '6:49 a.m.', '7:09 a.m.', '7:29 a.m.', '7:49 a.m.', '8:09 a.m.', '8:29 a.m.', '8:49 a.m.', '9:09 a.m.', '9:29 a.m.', '9:49 a.m.', '10:09 a.m.', '10:29 a.m.', '10:49 a.m.', '11:09 a.m.', '11:29 a.m.', '11:49 a.m.', '12:09 p.m.', '12:29 p.m.', '12:49 p.m.', '1:09 p.m.', '1:29 p.m.', '1:49 p.m.', '2:09 p.m.', '2:29 p.m.', '2:49 p.m.', '3:09 p.m.', '3:29 p.m.', '3:49 p.m.', '4:09 p.m.', '4:29 p.m.', '4:49 p.m.', '5:09 p.m.', '5:29 p.m.', '5:49 p.m.', '6:09 p.m.', '6:29 p.m.', '6:49 p.m.', '7:09 p.m.', '7:29 p.m.', '7:49 p.m.', '8:09 p.m.', '8:29 p.m.', '8:49 p.m.', '9:09 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B021%2FP21_IMG1.PNG?alt=media&token=91ce44ef-c1dc-4c21-af80-e37a23077c40' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B021%2FP21_IMG2.PNG?alt=media&token=284dd460-7afd-411e-82e1-10eb3724790d' }
          ]
        },
        {
          numParada: '22',
          nameParada: 'Av. Ambalá X Cll. 68',
          coordinates: {
            latitude: 4.447257,
            longitude: -75.194375
          },
          horariosParada: ['5:10 a.m.', '5:30 a.m.', '5:50 a.m.', '6:10 a.m.', '6:30 a.m.', '6:50 a.m.', '7:13 a.m.', '7:33 a.m.', '7:53 a.m.', '8:13 a.m.', '8:33 a.m.', '8:53 a.m.', '9:13 a.m.', '9:33 a.m.', '9:53 a.m.', '10:10 a.m.', '10:30 a.m.', '10:50 a.m.', '11:10 a.m.', '11:30 a.m.', '11:50 a.m.', '12:10 p.m.', '12:30 p.m.', '12:50 p.m.', '1:10 p.m.', '1:30 p.m.', '1:50 p.m.', '2:10 p.m.', '2:30 p.m.', '2:50 p.m.', '3:13 p.m.', '3:33 p.m.', '3:53 p.m.', '4:13 p.m.', '4:33 p.m.', '4:53 p.m.', '5:13 p.m.', '5:33 p.m.', '5:53 p.m.', '6:13 p.m.', '6:33 p.m.', '6:53 p.m.', '7:13 p.m.', '7:33 p.m.', '7:53 p.m.', '8:10 p.m.', '8:30 p.m.', '8:50 p.m.', '9:10 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B022%2FP22_IMG1.PNG?alt=media&token=81fc911b-56f9-43ce-b70f-679192385ae7' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B022%2FP22_IMG2.PNG?alt=media&token=84854e7b-1a6b-426e-8fe2-95619a45734c' }
          ]
        },
        {
          numParada: '23',
          nameParada: 'Av. Ambalá',
          coordinates: {
            latitude: 4.446715,
            longitude: -75.191916
          },
          horariosParada: ['5:10 a.m.', '5:30 a.m.', '5:50 a.m.', '6:10 a.m.', '6:30 a.m.', '6:50 a.m.', '7:14 a.m.', '7:34 a.m.', '7:54 a.m.', '8:14 a.m.', '8:34 a.m.', '8:54 a.m.', '9:14 a.m.', '9:34 a.m.', '9:54 a.m.', '10:11 a.m.', '10:31 a.m.', '10:51 a.m.', '11:11 a.m.', '11:31 a.m.', '11:51 a.m.', '12:11 p.m.', '12:31 p.m.', '12:51 p.m.', '1:11 p.m.', '1:31 p.m.', '1:51 p.m.', '2:11 p.m.', '2:31 p.m.', '2:51 p.m.', '3:14 p.m.', '3:34 p.m.', '3:54 p.m.', '4:14 p.m.', '4:34 p.m.', '4:54 p.m.', '5:14 p.m.', '5:34 p.m.', '5:54 p.m.', '6:14 p.m.', '6:34 p.m.', '6:54 p.m.', '7:14 p.m.', '7:34 p.m.', '7:54 p.m.', '8:10 p.m.', '8:30 p.m.', '8:50 p.m.', '9:10 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B023%2FP23_IMG1.PNG?alt=media&token=70cb931c-b2d5-49ba-81b8-f3a256ab6d62' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B023%2FP23_IMG2.PNG?alt=media&token=9460f7a1-a01f-4a99-8aec-c5eeeb6fa87b' }
          ]
        },
        {
          numParada: '24',
          nameParada: 'Av. Ambalá X Cll. 75 A',
          coordinates: {
            latitude: 4.446618,
            longitude: -75.191456
          },
          horariosParada: ['5:11 a.m.', '5:31 a.m.', '5:51 a.m.', '6:11 a.m.', '6:31 a.m.', '6:51 a.m.', '7:14 a.m.', '7:34 a.m.', '7:54 a.m.', '8:14 a.m.', '8:34 a.m.', '8:54 a.m.', '9:14 a.m.', '9:34 a.m.', '9:54 a.m.', '10:11 a.m.', '10:31 a.m.', '10:51 a.m.', '11:11 a.m.', '11:31 a.m.', '11:51 a.m.', '12:11 p.m.', '12:31 p.m.', '12:51 p.m.', '1:11 p.m.', '1:31 p.m.', '1:51 p.m.', '2:11 p.m.', '2:31 p.m.', '2:51 p.m.', '3:14 p.m.', '3:34 p.m.', '3:54 p.m.', '4:14 p.m.', '4:34 p.m.', '4:54 p.m.', '5:14 p.m.', '5:34 p.m.', '5:54 p.m.', '6:14 p.m.', '6:34 p.m.', '6:54 p.m.', '7:14 p.m.', '7:34 p.m.', '7:54 p.m.', '8:11 p.m.', '8:31 p.m.', '8:51 p.m.', '9:11 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B024%2FP24_IMG1.PNG?alt=media&token=3d239246-9d2a-4fd5-9300-8c6f675df6ef' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B024%2FP24_IMG2.PNG?alt=media&token=3933891d-bc36-40ec-848d-2389ba9f9b55' }
          ]
        },
        {
          numParada: '25',
          nameParada: 'Call. 77 X Cra. 11',
          coordinates: {
            latitude: 4.445133,
            longitude: -75.191108
          },
          horariosParada: ['5:11 a.m.', '5:31 a.m.', '5:51 a.m.', '6:11 a.m.', '6:31 a.m.', '6:51 a.m.', '7:14 a.m.', '7:34 a.m.', '7:54 a.m.', '8:14 a.m.', '8:34 a.m.', '8:54 a.m.', '9:14 a.m.', '9:34 a.m.', '9:54 a.m.', '10:12 a.m.', '10:32 a.m.', '10:52 a.m.', '11:12 a.m.', '11:32 a.m.', '11:52 a.m.', '12:12 p.m.', '12:32 p.m.', '12:52 p.m.', '1:12 p.m.', '1:32 p.m.', '1:52 p.m.', '2:12 p.m.', '2:32 p.m.', '2:52 p.m.', '3:14 p.m.', '3:34 p.m.', '3:54 p.m.', '4:14 p.m.', '4:34 p.m.', '4:54 p.m.', '5:14 p.m.', '5:34 p.m.', '5:54 p.m.', '6:14 p.m.', '6:34 p.m.', '6:54 p.m.', '7:14 p.m.', '7:34 p.m.', '7:54 p.m.', '8:11 p.m.', '8:31 p.m.', '8:51 p.m.', '9:11 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B025%2FP25_IMG1.PNG?alt=media&token=cb86d205-2357-402b-940a-0b78786f4d46' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B025%2FP25_IMG2.PNG?alt=media&token=0ab7fa3b-7586-4d6c-943f-e53f93b49376' }
          ]
        },
        {
          numParada: '26',
          nameParada: 'Call. 77 X Cra. 10',
          coordinates: {
            latitude: 4.443057,
            longitude: -75.191917
          },
          horariosParada: ['5:12 a.m.', '5:32 a.m.', '5:52 a.m.', '6:12 a.m.', '6:32 a.m.', '6:52 a.m.', '7:15 a.m.', '7:35 a.m.', '7:55 a.m.', '8:15 a.m.', '8:35 a.m.', '8:55 a.m.', '9:15 a.m.', '9:35 a.m.', '9:55 a.m.', '10:13 a.m.', '10:33 a.m.', '10:53 a.m.', '11:13 a.m.', '11:33 a.m.', '11:53 a.m.', '12:13 p.m.', '12:33 p.m.', '12:53 p.m.', '1:13 p.m.', '1:33 p.m.', '1:53 p.m.', '2:13 p.m.', '2:33 p.m.', '2:53 p.m.', '3:15 p.m.', '3:35 p.m.', '3:55 p.m.', '4:15 p.m.', '4:35 p.m.', '4:55 p.m.', '5:15 p.m.', '5:35 p.m.', '5:55 p.m.', '6:15 p.m.', '6:35 p.m.', '6:55 p.m.', '7:15 p.m.', '7:35 p.m.', '7:55 p.m.', '8:12 p.m.', '8:32 p.m.', '8:52 p.m.', '9:12 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B026%2FP26_IMG1.PNG?alt=media&token=a7f96acb-e3d6-47e4-b914-5c84d0b8b2c2' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B026%2FP26_IMG2.PNG?alt=media&token=cdae4f49-e68d-4d89-b098-55e9635f4448' }
          ]
        },
        {
          numParada: '27',
          nameParada: 'Usi',
          coordinates: {
            latitude: 4.442421,
            longitude: -75.195718
          },
          horariosParada: ['5:13 a.m.', '5:33 a.m.', '5:53 a.m.', '6:13 a.m.', '6:33 a.m.', '6:53 a.m.', '7:17 a.m.', '7:37 a.m.', '7:57 a.m.', '8:17 a.m.', '8:37 a.m.', '8:57 a.m.', '9:17 a.m.', '9:37 a.m.', '9:57 a.m.', '10:14 a.m.', '10:34 a.m.', '10:54 a.m.', '11:14 a.m.', '11:34 a.m.', '11:54 a.m.', '12:14 p.m.', '12:34 p.m.', '12:54 p.m.', '1:14 p.m.', '1:34 p.m.', '1:54 p.m.', '2:14 p.m.', '2:34 p.m.', '2:54 p.m.', '3:17 p.m.', '3:37 p.m.', '3:57 p.m.', '4:17 p.m.', '4:37 p.m.', '4:57 p.m.', '5:17 p.m.', '5:37 p.m.', '5:57 p.m.', '6:17 p.m.', '6:37 p.m.', '6:57 p.m.', '7:17 p.m.', '7:37 p.m.', '7:57 p.m.', '8:13 p.m.', '8:33 p.m.', '8:53 p.m.', '9:13 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B027%2FP27_IMG1.PNG?alt=media&token=87e286c3-20a8-410a-9e8d-8d3d5937330c' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B027%2FP27_IMG2.PNG?alt=media&token=5e999b8a-9962-4dcc-a6df-e7f736c53471' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B027%2FP27_IMG3.PNG?alt=media&token=1a040a49-4ed4-4bc6-b5d8-ba7a6eda82dc' }
          ]
        },
        {
          numParada: '28',
          nameParada: 'Colegio Niño Jesús De Praga',
          coordinates: {
            latitude: 4.442267,
            longitude: -75.198827
          },
          horariosParada: ['5:14 a.m.', '5:34 a.m.', '5:54 a.m.', '6:14 a.m.', '6:34 a.m.', '6:54 a.m.', '7:18 a.m.', '7:38 a.m.', '7:58 a.m.', '8:18 a.m.', '8:38 a.m.', '8:58 a.m.', '9:18 a.m.', '9:38 a.m.', '9:58 a.m.', '10:15 a.m.', '10:35 a.m.', '10:55 a.m.', '11:15 a.m.', '11:35 a.m.', '11:55 a.m.', '12:15 p.m.', '12:35 p.m.', '12:55 p.m.', '1:15 p.m.', '1:35 p.m.', '1:55 p.m.', '2:15 p.m.', '2:35 p.m.', '2:55 p.m.', '3:18 p.m.', '3:38 p.m.', '3:58 p.m.', '4:18 p.m.', '4:38 p.m.', '4:58 p.m.', '5:18 p.m.', '5:38 p.m.', '5:58 p.m.', '6:18 p.m.', '6:38 p.m.', '6:58 p.m.', '7:18 p.m.', '7:38 p.m.', '7:58 p.m.', '8:14 p.m.', '8:34 p.m.', '8:54 p.m.', '9:14 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B028%2FP28_IMG1.PNG?alt=media&token=40135d6e-e92f-47e6-922c-bf1dbd88b227' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B028%2FP28_IMG2.PNG?alt=media&token=915b8b85-71e2-4598-b923-aa5b27841c77' }
          ]
        },
        {
          numParada: '29',
          nameParada: 'Cra. 10d',
          coordinates: {
            latitude: 4.443390,
            longitude: -75.201144
          },
          horariosParada: ['5:14 a.m.', '5:34 a.m.', '5:54 a.m.', '6:14 a.m.', '6:34 a.m.', '6:54 a.m.', '7:19 a.m.', '7:39 a.m.', '7:59 a.m.', '8:19 a.m.', '8:39 a.m.', '8:59 a.m.', '9:19 a.m.', '9:39 a.m.', '9:59 a.m.', '10:16 a.m.', '10:36 a.m.', '10:56 a.m.', '11:16 a.m.', '11:36 a.m.', '11:56 a.m.', '12:16 p.m.', '12:36 p.m.', '12:56 p.m.', '1:16 p.m.', '1:36 p.m.', '1:56 p.m.', '2:16 p.m.', '2:36 p.m.', '2:56 p.m.', '3:19 p.m.', '3:39 p.m.', '3:59 p.m.', '4:19 p.m.', '4:39 p.m.', '4:59 p.m.', '5:19 p.m.', '5:39 p.m.', '5:59 p.m.', '6:19 p.m.', '6:39 p.m.', '6:59 p.m.', '7:19 p.m.', '7:39 p.m.', '7:59 p.m.', '8:14 p.m.', '8:34 p.m.', '8:54 p.m.', '9:14 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B029%2FP29_IMG1.PNG?alt=media&token=b0727d40-f9ce-4224-871e-be1a7690e71a' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B029%2FP29_IMG2.PNG?alt=media&token=f4430433-6642-4b08-87dd-d055705f07db' }
          ]
        },
        {
          numParada: '30',
          nameParada: 'Cra. 8 X Cll. 64',
          coordinates: {
            latitude: 4.440199,
            longitude: -75.201663
          },
          horariosParada: ['5:15 a.m.', '5:35 a.m.', '5:55 a.m.', '6:15 a.m.', '6:35 a.m.', '6:55 a.m.', '7:20 a.m.', '7:40 a.m.', '8:00 a.m.', '8:20 a.m.', '8:40 a.m.', '9:00 a.m.', '9:20 a.m.', '9:40 a.m.', '10:00 a.m.', '10:17 a.m.', '10:37 a.m.', '10:57 a.m.', '11:17 a.m.', '11:37 a.m.', '11:57 a.m.', '12:17 p.m.', '12:37 p.m.', '12:57 p.m.', '1:17 p.m.', '1:37 p.m.', '1:57 p.m.', '2:17 p.m.', '2:37 p.m.', '2:57 p.m.', '3:20 p.m.', '3:40 p.m.', '4:00 p.m.', '4:20 p.m.', '4:40 p.m.', '5:00 p.m.', '5:20 p.m.', '5:40 p.m.', '6:00 p.m.', '6:20 p.m.', '6:40 p.m.', '7:00 p.m.', '7:20 p.m.', '7:40 p.m.', '8:00 p.m.', '8:15 p.m.', '8:35 p.m.', '8:55 p.m.', '9:15 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B030%2FP30_IMG1.PNG?alt=media&token=26e101c8-7932-4ffb-b1be-b303c74ae84b' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B030%2FP30_IMG2.PNG?alt=media&token=b1f19b15-3381-4a07-901d-804a5e49c17d' }
          ]
        },
        {
          numParada: '31',
          nameParada: 'Centro Comercial Multicentro',
          coordinates: {
            latitude: 4.436711,
            longitude: -75.200509
          },
          horariosParada: ['5:16 a.m.', '5:36 a.m.', '5:56 a.m.', '6:16 a.m.', '6:36 a.m.', '6:56 a.m.', '7:21 a.m.', '7:41 a.m.', '8:01 a.m.', '8:21 a.m.', '8:41 a.m.', '9:01 a.m.', '9:21 a.m.', '9:41 a.m.', '10:01 a.m.', '10:18 a.m.', '10:38 a.m.', '10:58 a.m.', '11:18 a.m.', '11:38 a.m.', '11:58 a.m.', '12:18 p.m.', '12:38 p.m.', '12:58 p.m.', '1:18 p.m.', '1:38 p.m.', '1:58 p.m.', '2:18 p.m.', '2:38 p.m.', '2:58 p.m.', '3:21 p.m.', '3:41 p.m.', '4:01 p.m.', '4:21 p.m.', '4:41 p.m.', '5:01 p.m.', '5:21 p.m.', '5:41 p.m.', '6:01 p.m.', '6:21 p.m.', '6:41 p.m.', '7:01 p.m.', '7:21 p.m.', '7:41 p.m.', '8:01 p.m.', '8:16 p.m.', '8:36 p.m.', '8:56 p.m.', '9:16 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B031%2FP31_IMG1.PNG?alt=media&token=9565b725-7fdd-47b2-9791-d79615bd1740' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B031%2FP31_IMG2.PNG?alt=media&token=75d0395b-bafb-4f94-9d98-999eb8625f4f' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B031%2FP31_IMG3.PNG?alt=media&token=f4d6cf8f-be6b-437f-ac68-a964c4924bcc' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B031%2FP31_IMG4.PNG?alt=media&token=4c127a01-2625-4ca3-893b-2b7b058af66b' }
          ]
        },
        {
          numParada: '32',
          nameParada: 'Multicentro',
          coordinates: {
            latitude: 4.436501,
            longitude: -75.201051
          },
          horariosParada: ['5:17 a.m.', '5:37 a.m.', '5:57 a.m.', '6:17 a.m.', '6:37 a.m.', '6:57 a.m.', '7:22 a.m.', '7:42 a.m.', '8:02 a.m.', '8:22 a.m.', '8:42 a.m.', '9:02 a.m.', '9:22 a.m.', '9:42 a.m.', '10:02 a.m.', '10:18 a.m.', '10:38 a.m.', '10:58 a.m.', '11:18 a.m.', '11:38 a.m.', '11:58 a.m.', '12:18 p.m.', '12:38 p.m.', '12:58 p.m.', '1:18 p.m.', '1:38 p.m.', '1:58 p.m.', '2:18 p.m.', '2:38 p.m.', '2:58 p.m.', '3:22 p.m.', '3:42 p.m.', '4:02 p.m.', '4:22 p.m.', '4:42 p.m.', '5:02 p.m.', '5:22 p.m.', '5:42 p.m.', '6:02 p.m.', '6:22 p.m.', '6:42 p.m.', '7:02 p.m.', '7:22 p.m.', '7:42 p.m.', '8:02 p.m.', '8:17 p.m.', '8:37 p.m.', '8:57 p.m.', '9:17 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B032%2FP32_IMG1.PNG?alt=media&token=82024dae-3e25-42d5-8aab-92c4832c141b' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B032%2FP32_IMG2.PNG?alt=media&token=76706622-bad6-42c0-b270-2fcab38ff58d' }
          ]
        },
        {
          numParada: '33',
          nameParada: 'Hospital Federico Lleras Acosta Sede Limonar',
          coordinates: {
            latitude: 4.435414,
            longitude: -75.204470
          },
          horariosParada: ['5:17 a.m.', '5:37 a.m.', '5:57 a.m.', '6:17 a.m.', '6:37 a.m.', '6:57 a.m.', '7:23 a.m.', '7:43 a.m.', '8:03 a.m.', '8:23 a.m.', '8:43 a.m.', '9:03 a.m.', '9:23 a.m.', '9:43 a.m.', '10:02 a.m.', '10:19 a.m.', '10:39 a.m.', '10:59 a.m.', '11:19 a.m.', '11:39 a.m.', '11:59 a.m.', '12:19 p.m.', '12:39 p.m.', '12:59 p.m.', '1:19 p.m.', '1:39 p.m.', '1:59 p.m.', '2:19 p.m.', '2:39 p.m.', '2:59 p.m.', '3:23 p.m.', '3:43 p.m.', '4:03 p.m.', '4:23 p.m.', '4:43 p.m.', '5:03 p.m.', '5:23 p.m.', '5:43 p.m.', '6:03 p.m.', '6:23 p.m.', '6:43 p.m.', '7:03 p.m.', '7:23 p.m.', '7:43 p.m.', '8:02 p.m.', '8:17 p.m.', '8:37 p.m.', '8:57 p.m.', '9:17 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B033%2FP33_IMG1.PNG?alt=media&token=3914529a-ef8a-4d02-928b-74e6c3ba345d' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B033%2FP33_IMG2.PNG?alt=media&token=7e783b32-b39b-4647-9deb-1d57f69d3ef8' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B033%2FP33_IMG3.PNG?alt=media&token=c778ade3-7461-4444-b64e-5706f17eebbc' }
          ]
        },
        {
          numParada: '34',
          nameParada: 'Cra. 5 X Call. 47',
          coordinates: {
            latitude: 4.433162,
            longitude: -75.206748
          },
          horariosParada: ['5:18 a.m.', '5:38 a.m.', '5:58 a.m.', '6:18 a.m.', '6:38 a.m.', '6:58 a.m.', '7:24 a.m.', '7:44 a.m.', '8:04 a.m.', '8:24 a.m.', '8:44 a.m.', '9:04 a.m.', '9:24 a.m.', '9:44 a.m.', '10:03 a.m.', '10:20 a.m.', '10:40 a.m.', '11:00 a.m.', '11:20 a.m.', '11:40 a.m.', '12:00 a.m.', '12:20 p.m.', '12:40 p.m.', '1:00 p.m.', '1:20 p.m.', '1:40 p.m.', '2:00 p.m.', '2:20 p.m.', '2:40 p.m.', '3:00 p.m.', '3:24 p.m.', '3:44 p.m.', '4:04 p.m.', '4:24 p.m.', '4:44 p.m.', '5:04 p.m.', '5:24 p.m.', '5:44 p.m.', '6:04 p.m.', '6:24 p.m.', '6:44 p.m.', '7:04 p.m.', '7:24 p.m.', '7:44 p.m.', '8:03 p.m.', '8:18 p.m.', '8:38 p.m.', '8:58 p.m.', '9:18 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B034%2FP34_IMG1.PNG?alt=media&token=2f789fdd-4ef2-4cae-b956-2b1a15d7a302' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B034%2FP34_IMG2.PNG?alt=media&token=412c6d68-4531-4467-a923-a8aa3afbb4df' }
          ]
        },
        {
          numParada: '35',
          nameParada: 'Cra. 5 X Call. 44',
          coordinates: {
            latitude: 4.432176,
            longitude: -75.208942
          },
          horariosParada: ['5:19 a.m.', '5:39 a.m.', '5:59 a.m.', '6:19 a.m.', '6:39 a.m.', '6:59 a.m.', '7:25 a.m.', '7:45 a.m.', '8:05 a.m.', '8:25 a.m.', '8:45 a.m.', '9:05 a.m.', '9:25 a.m.', '9:45 a.m.', '10:04 a.m.', '10:21 a.m.', '10:41 a.m.', '11:01 a.m.', '11:21 a.m.', '11:41 a.m.', '12:01 a.m.', '12:21 p.m.', '12:41 p.m.', '1:01 p.m.', '1:21 p.m.', '1:41 p.m.', '2:01 p.m.', '2:21 p.m.', '2:41 p.m.', '3:01 p.m.', '3:25 p.m.', '3:45 p.m.', '4:05 p.m.', '4:25 p.m.', '4:45 p.m.', '5:05 p.m.', '5:25 p.m.', '5:45 p.m.', '6:05 p.m.', '6:25 p.m.', '6:45 p.m.', '7:05 p.m.', '7:25 p.m.', '7:45 p.m.', '8:04 p.m.', '8:19 p.m.', '8:39 p.m.', '8:59 p.m.', '9:19 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B035%2FP35_IMG1.PNG?alt=media&token=b9ccb5f7-fe73-4bc3-b8f9-88cf3697aefb' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B035%2FP35_IMG2.PNG?alt=media&token=e130c81a-a5ea-4dbc-bf4d-7036b1523e29' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B035%2FP35_IMG3.PNG?alt=media&token=65ef0bd2-8bb3-4a9c-b187-94b18d5cb045' }
          ]
        },
        {
          numParada: '36',
          nameParada: 'Sena',
          coordinates: {
            latitude: 4.432838,
            longitude: -75.211239
          },
          horariosParada: ['5:20 a.m.', '5:40 a.m.', '6:00 a.m.', '6:20 a.m.', '6:40 a.m.', '7:00 a.m.', '7:26 a.m.', '7:46 a.m.', '8:06 a.m.', '8:26 a.m.', '8:46 a.m.', '9:06 a.m.', '9:26 a.m.', '9:46 a.m.', '10:05 a.m.', '10:22 a.m.', '10:42 a.m.', '11:02 a.m.', '11:22 a.m.', '11:42 a.m.', '12:02 a.m.', '12:22 p.m.', '12:42 p.m.', '1:02 p.m.', '1:22 p.m.', '1:42 p.m.', '2:02 p.m.', '2:22 p.m.', '2:42 p.m.', '3:02 p.m.', '3:26 p.m.', '3:46 p.m.', '4:06 p.m.', '4:26 p.m.', '4:46 p.m.', '5:06 p.m.', '5:26 p.m.', '5:46 p.m.', '6:06 p.m.', '6:26 p.m.', '6:46 p.m.', '7:06 p.m.', '7:26 p.m.', '7:46 p.m.', '8:05 p.m.', '8:20 p.m.', '8:40 p.m.', '9:00 p.m.', '9:20 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B036%2FP36_IMG1.PNG?alt=media&token=403ea464-4dc5-4804-8312-2688b5957d2e' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B036%2FP36_IMG2.PNG?alt=media&token=e0325a0d-3e7b-4c4a-92a3-87be78cb9ed4' }
          ]
        },
        {
          numParada: '37',
          nameParada: 'Av. Ferrocarril X Cll. 42',
          coordinates: {
            latitude: 4.433391,
            longitude: -75.212030
          },
          horariosParada: ['5:20 a.m.', '5:40 a.m.', '6:00 a.m.', '6:20 a.m.', '6:40 a.m.', '7:00 a.m.', '7:26 a.m.', '7:46 a.m.', '8:06 a.m.', '8:26 a.m.', '8:46 a.m.', '9:06 a.m.', '9:26 a.m.', '9:46 a.m.', '10:05 a.m.', '10:22 a.m.', '10:42 a.m.', '11:02 a.m.', '11:22 a.m.', '11:42 a.m.', '12:02 a.m.', '12:22 p.m.', '12:42 p.m.', '1:02 p.m.', '1:22 p.m.', '1:42 p.m.', '2:02 p.m.', '2:22 p.m.', '2:42 p.m.', '3:02 p.m.', '3:26 p.m.', '3:46 p.m.', '4:06 p.m.', '4:26 p.m.', '4:46 p.m.', '5:06 p.m.', '5:26 p.m.', '5:46 p.m.', '6:06 p.m.', '6:26 p.m.', '6:46 p.m.', '7:06 p.m.', '7:26 p.m.', '7:46 p.m.', '8:05 p.m.', '8:20 p.m.', '8:40 p.m.', '9:00 p.m.', '9:20 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B037%2FP37_IMG1.PNG?alt=media&token=fba33a0e-04b6-4108-8a29-8803041ba857' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B037%2FP37_IMG2.PNG?alt=media&token=2f65021a-e208-4247-9640-d24d89542292' }
          ]
        },
        {
          numParada: '38',
          nameParada: 'Ferrocarril Cll. 42',
          coordinates: {
            latitude: 4.433862,
            longitude: -75.212649
          },
          horariosParada: ['5:20 a.m.', '5:40 a.m.', '6:00 a.m.', '6:20 a.m.', '6:40 a.m.', '7:00 a.m.', '7:26 a.m.', '7:46 a.m.', '8:06 a.m.', '8:26 a.m.', '8:46 a.m.', '9:06 a.m.', '9:26 a.m.', '9:46 a.m.', '10:05 a.m.', '10:22 a.m.', '10:42 a.m.', '11:02 a.m.', '11:22 a.m.', '11:42 a.m.', '12:02 a.m.', '12:22 p.m.', '12:42 p.m.', '1:02 p.m.', '1:22 p.m.', '1:42 p.m.', '2:02 p.m.', '2:22 p.m.', '2:42 p.m.', '3:02 p.m.', '3:26 p.m.', '3:46 p.m.', '4:06 p.m.', '4:26 p.m.', '4:46 p.m.', '5:06 p.m.', '5:26 p.m.', '5:46 p.m.', '6:06 p.m.', '6:26 p.m.', '6:46 p.m.', '7:06 p.m.', '7:26 p.m.', '7:46 p.m.', '8:05 p.m.', '8:20 p.m.', '8:40 p.m.', '9:00 p.m.', '9:20 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B038%2FP38_IMG1.PNG?alt=media&token=0cc2e2b8-930d-4b31-8e52-2853908bc64e' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B038%2FP38_IMG2.PNG?alt=media&token=c978bf4f-21ca-4d13-94b0-8d4a6be9ec97' }
          ]
        },
        {
          numParada: '39',
          nameParada: 'Cll. 42 X Cra. 4d',
          coordinates: {
            latitude: 4.432691,
            longitude: -75.214218
          },
          horariosParada: ['5:21 a.m.', '5:41 a.m.', '6:01 a.m.', '6:21 a.m.', '6:41 a.m.', '7:01 a.m.', '7:27 a.m.', '7:47 a.m.', '8:07 a.m.', '8:27 a.m.', '8:47 a.m.', '9:07 a.m.', '9:27 a.m.', '9:47 a.m.', '10:06 a.m.', '10:22 a.m.', '10:42 a.m.', '11:02 a.m.', '11:22 a.m.', '11:42 a.m.', '12:02 a.m.', '12:22 p.m.', '12:42 p.m.', '1:02 p.m.', '1:22 p.m.', '1:42 p.m.', '2:02 p.m.', '2:22 p.m.', '2:42 p.m.', '3:03 p.m.', '3:27 p.m.', '3:47 p.m.', '4:07 p.m.', '4:27 p.m.', '4:47 p.m.', '5:07 p.m.', '5:27 p.m.', '5:47 p.m.', '6:07 p.m.', '6:27 p.m.', '6:47 p.m.', '7:07 p.m.', '7:27 p.m.', '7:47 p.m.', '8:05 p.m.', '8:21 p.m.', '8:41 p.m.', '9:01 p.m.', '9:21 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B039%2FP39_IMG1.PNG?alt=media&token=4f18aa63-4d12-4425-b241-cd6efed217db' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B039%2FP39_IMG2.PNG?alt=media&token=ccf33816-1199-464a-a062-1951b65ca6bf' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B039%2FP39_IMG3.PNG?alt=media&token=6baa2798-c6a6-4da1-a2ca-3973ba6df40c' }
          ]
        },
        {
          numParada: '40',
          nameParada: 'Carrera 4 39b2',
          coordinates: {
            latitude: 4.430720,
            longitude: -75.214620
          },
          horariosParada: ['5:21 a.m.', '5:41 a.m.', '6:01 a.m.', '6:21 a.m.', '6:41 a.m.', '7:02 a.m.', '7:28 a.m.', '7:48 a.m.', '8:08 a.m.', '8:28 a.m.', '8:48 a.m.', '9:08 a.m.', '9:28 a.m.', '9:48 a.m.', '10:07 a.m.', '10:23 a.m.', '10:43 a.m.', '11:03 a.m.', '11:23 a.m.', '11:43 a.m.', '12:03 a.m.', '12:23 p.m.', '12:43 p.m.', '1:03 p.m.', '1:23 p.m.', '1:43 p.m.', '2:03 p.m.', '2:23 p.m.', '2:43 p.m.', '3:04 p.m.', '3:28 p.m.', '3:48 p.m.', '4:08 p.m.', '4:28 p.m.', '4:48 p.m.', '5:08 p.m.', '5:28 p.m.', '5:48 p.m.', '6:08 p.m.', '6:28 p.m.', '6:48 p.m.', '7:08 p.m.', '7:28 p.m.', '7:48 p.m.', '8:06 p.m.', '8:21 p.m.', '8:41 p.m.', '9:01 p.m.', '9:21 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B040%2FP40_IMG1.PNG?alt=media&token=b3d018db-4237-4d82-a52a-12c3e0f24c25' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B040%2FP40_IMG2.PNG?alt=media&token=7a187ef9-9c40-454d-987e-b38c4db04783' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B040%2FP40_IMG3.PNG?alt=media&token=67d738a6-9217-4d3d-92c2-3e3c5dedeef2' }
          ]
        },
        {
          numParada: '41',
          nameParada: 'Cra. 4 X Cll. 40',
          coordinates: {
            latitude: 4.430465,
            longitude: -75.215653
          },
          horariosParada: ['5:22 a.m.', '5:42 a.m.', '6:02 a.m.', '6:22 a.m.', '6:42 a.m.', '7:02 a.m.', '7:28 a.m.', '7:48 a.m.', '8:08 a.m.', '8:28 a.m.', '8:48 a.m.', '9:08 a.m.', '9:28 a.m.', '9:48 a.m.', '10:07 a.m.', '10:23 a.m.', '10:43 a.m.', '11:03 a.m.', '11:23 a.m.', '11:43 a.m.', '12:03 a.m.', '12:23 p.m.', '12:43 p.m.', '1:03 p.m.', '1:23 p.m.', '1:43 p.m.', '2:03 p.m.', '2:23 p.m.', '2:43 p.m.', '3:04 p.m.', '3:28 p.m.', '3:48 p.m.', '4:08 p.m.', '4:28 p.m.', '4:48 p.m.', '5:08 p.m.', '5:28 p.m.', '5:48 p.m.', '6:08 p.m.', '6:28 p.m.', '6:48 p.m.', '7:08 p.m.', '7:28 p.m.', '7:48 p.m.', '8:06 p.m.', '8:22 p.m.', '8:42 p.m.', '9:02 p.m.', '9:22 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B041%2FP41_IMG1.PNG?alt=media&token=ca21bb3e-e2cc-4c7d-8f2e-4b3229cbf055' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B041%2FP41_IMG2.PNG?alt=media&token=0a742576-6970-4aad-948d-840be5c96e22' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B041%2FP41_IMG3.PNG?alt=media&token=ae196063-b6a8-443f-8b2c-452f0091b68e' }
          ]
        },
        {
          numParada: '42',
          nameParada: 'Carrera 4 39-29',
          coordinates: {
            latitude: 4.430236,
            longitude: -75.216802
          },
          horariosParada: ['5:22 a.m.', '5:42 a.m.', '6:02 a.m.', '6:22 a.m.', '6:42 a.m.', '7:03 a.m.', '7:29 a.m.', '7:49 a.m.', '8:09 a.m.', '8:29 a.m.', '8:49 a.m.', '9:09 a.m.', '9:29 a.m.', '9:49 a.m.', '10:07 a.m.', '10:24 a.m.', '10:44 a.m.', '11:04 a.m.', '11:24 a.m.', '11:44 a.m.', '12:04 a.m.', '12:24 p.m.', '12:44 p.m.', '1:04 p.m.', '1:24 p.m.', '1:44 p.m.', '2:04 p.m.', '2:24 p.m.', '2:44 p.m.', '3:05 p.m.', '3:29 p.m.', '3:49 p.m.', '4:09 p.m.', '4:29 p.m.', '4:49 p.m.', '5:09 p.m.', '5:29 p.m.', '5:49 p.m.', '6:09 p.m.', '6:29 p.m.', '6:49 p.m.', '7:09 p.m.', '7:29 p.m.', '7:49 p.m.', '8:07 p.m.', '8:22 p.m.', '8:42 p.m.', '9:02 p.m.', '9:22 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B042%2FP42_IMG1.PNG?alt=media&token=98957c20-ec3c-402b-8a30-5874a1893fb0' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B042%2FP42_IMG2.PNG?alt=media&token=5c6fcb4f-9e7a-41b4-887d-fc03a5dcacab' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B042%2FP42_IMG3.PNG?alt=media&token=ac01b28f-11c5-4a9c-b3fa-bbc3a6ab0b75' }
          ]
        },
        {
          numParada: '43',
          nameParada: 'Carrera 4 39-29',
          coordinates: {
            latitude: 4.430421,
            longitude: -75.217025
          },
          horariosParada: ['5:22 a.m.', '5:42 a.m.', '6:02 a.m.', '6:22 a.m.', '6:42 a.m.', '7:03 a.m.', '7:29 a.m.', '7:49 a.m.', '8:09 a.m.', '8:29 a.m.', '8:49 a.m.', '9:09 a.m.', '9:29 a.m.', '9:49 a.m.', '10:07 a.m.', '10:24 a.m.', '10:44 a.m.', '11:04 a.m.', '11:24 a.m.', '11:44 a.m.', '12:04 a.m.', '12:24 p.m.', '12:44 p.m.', '1:04 p.m.', '1:24 p.m.', '1:44 p.m.', '2:04 p.m.', '2:24 p.m.', '2:44 p.m.', '3:05 p.m.', '3:29 p.m.', '3:49 p.m.', '4:09 p.m.', '4:29 p.m.', '4:49 p.m.', '5:09 p.m.', '5:29 p.m.', '5:49 p.m.', '6:09 p.m.', '6:29 p.m.', '6:49 p.m.', '7:09 p.m.', '7:29 p.m.', '7:49 p.m.', '8:07 p.m.', '8:22 p.m.', '8:42 p.m.', '9:02 p.m.', '9:22 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B043%2FP43_IMG1.PNG?alt=media&token=a98800e6-4845-4e34-8e6e-c915ea8b6d79' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B043%2FP43_IMG2.PNG?alt=media&token=faa19d70-5264-4672-93eb-1c5ab193572a' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B043%2FP43_IMG3.PNG?alt=media&token=c9aed9c1-0410-46a0-a7c9-26c2ff338e56' }
          ]
        },
        {
          numParada: '44',
          nameParada: 'Estadio',
          coordinates: {
            latitude: 4.431171,
            longitude: -75.217746
          },
          horariosParada: ['5:22 a.m.', '5:42 a.m.', '6:02 a.m.', '6:22 a.m.', '6:42 a.m.', '7:03 a.m.', '7:29 a.m.', '7:49 a.m.', '8:09 a.m.', '8:29 a.m.', '8:49 a.m.', '9:09 a.m.', '9:29 a.m.', '9:49 a.m.', '10:08 a.m.', '10:24 a.m.', '10:44 a.m.', '11:04 a.m.', '11:24 a.m.', '11:44 a.m.', '12:04 a.m.', '12:24 p.m.', '12:44 p.m.', '1:04 p.m.', '1:24 p.m.', '1:44 p.m.', '2:04 p.m.', '2:24 p.m.', '2:44 p.m.', '3:05 p.m.', '3:29 p.m.', '3:49 p.m.', '4:09 p.m.', '4:29 p.m.', '4:49 p.m.', '5:09 p.m.', '5:29 p.m.', '5:49 p.m.', '6:09 p.m.', '6:29 p.m.', '6:49 p.m.', '7:09 p.m.', '7:29 p.m.', '7:49 p.m.', '8:07 p.m.', '8:22 p.m.', '8:42 p.m.', '9:02 p.m.', '9:22 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B044%2FP44_IMG1.PNG?alt=media&token=81c122f2-a215-4e88-8174-c9be3f3655d1' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B044%2FP44_IMG2.PNG?alt=media&token=9714f0fd-d5ec-4bcd-9824-3a5b35844cb9' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B044%2FP44_IMG3.PNG?alt=media&token=3fe85919-3134-4eb5-a8f3-a50aad358276' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B044%2FP44_IMG4.PNG?alt=media&token=13b8cfb3-a53a-4701-bf9e-e5d721f37889' }
          ]
        },
        {
          numParada: '45',
          nameParada: 'Carrera 4 35-53',
          coordinates: {
            latitude: 4.431686,
            longitude: -75.220470
          },
          horariosParada: ['5:23 a.m.', '5:43 a.m.', '6:03 a.m.', '6:23 a.m.', '6:43 a.m.', '7:04 a.m.', '7:30 a.m.', '7:50 a.m.', '8:10 a.m.', '8:30 a.m.', '8:50 a.m.', '9:10 a.m.', '9:30 a.m.', '9:50 a.m.', '10:08 a.m.', '10:25 a.m.', '10:45 a.m.', '11:05 a.m.', '11:25 a.m.', '11:45 a.m.', '12:05 a.m.', '12:25 p.m.', '12:45 p.m.', '1:05 p.m.', '1:25 p.m.', '1:45 p.m.', '2:05 p.m.', '2:25 p.m.', '2:45 p.m.', '3:06 p.m.', '3:30 p.m.', '3:50 p.m.', '4:10 p.m.', '4:30 p.m.', '4:50 p.m.', '5:10 p.m.', '5:30 p.m.', '5:50 p.m.', '6:10 p.m.', '6:30 p.m.', '6:50 p.m.', '7:10 p.m.', '7:30 p.m.', '7:50 p.m.', '8:08 p.m.', '8:23 p.m.', '8:43 p.m.', '9:03 p.m.', '9:23 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B045%2FP45_IMG1.PNG?alt=media&token=d9759554-2794-4084-b1b9-793ef3334c5f' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B045%2FP45_IMG2.PNG?alt=media&token=2ee8aa1c-028a-4be8-b69b-1aa08612c865' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B045%2FP45_IMG3.PNG?alt=media&token=a8901ab2-be71-4237-9550-4484e66ef213' }
          ]
        },
        {
          numParada: '46',
          nameParada: 'Hospital Federico Lleras',
          coordinates: {
            latitude: 4.432698,
            longitude: -75.220642
          },
          horariosParada: ['5:23 a.m.', '5:43 a.m.', '6:03 a.m.', '6:23 a.m.', '6:43 a.m.', '7:04 a.m.', '7:31 a.m.', '7:51 a.m.', '8:11 a.m.', '8:31 a.m.', '8:51 a.m.', '9:11 a.m.', '9:31 a.m.', '9:51 a.m.', '10:09 a.m.', '10:25 a.m.', '10:45 a.m.', '11:05 a.m.', '11:25 a.m.', '11:45 a.m.', '12:05 a.m.', '12:25 p.m.', '12:45 p.m.', '1:05 p.m.', '1:25 p.m.', '1:45 p.m.', '2:05 p.m.', '2:25 p.m.', '2:45 p.m.', '3:06 p.m.', '3:31 p.m.', '3:51 p.m.', '4:11 p.m.', '4:31 p.m.', '4:51 p.m.', '5:11 p.m.', '5:31 p.m.', '5:51 p.m.', '6:11 p.m.', '6:31 p.m.', '6:51 p.m.', '7:11 p.m.', '7:31 p.m.', '7:51 p.m.', '8:08 p.m.', '8:23 p.m.', '8:43 p.m.', '9:03 p.m.', '9:23 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B046%2FP46_IMG1.PNG?alt=media&token=a1b4eb5b-6194-455f-b5d7-0cac0af3fb58' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B046%2FP46_IMG2.PNG?alt=media&token=45144fc3-161f-43ff-8598-ad459527c16b' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B046%2FP46_IMG3.PNG?alt=media&token=838b99b0-a75c-4847-b2ff-e104d9cf4bfa' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B046%2FP46_IMG4.PNG?alt=media&token=224be352-4e2d-4087-898d-530251374d3c' }
          ]
        },
        {
          numParada: '47',
          nameParada: 'Carrera 4a 34a2',
          coordinates: {
            latitude: 4.433105,
            longitude: -75.221216
          },
          horariosParada: ['5:24 a.m.', '5:44 a.m.', '6:04 a.m.', '6:24 a.m.', '6:44 a.m.', '7:05 a.m.', '7:31 a.m.', '7:51 a.m.', '8:11 a.m.', '8:31 a.m.', '8:51 a.m.', '9:11 a.m.', '9:31 a.m.', '9:51 a.m.', '10:09 a.m.', '10:26 a.m.', '10:46 a.m.', '11:06 a.m.', '11:26 a.m.', '11:46 a.m.', '12:06 a.m.', '12:26 p.m.', '12:46 p.m.', '1:06 p.m.', '1:26 p.m.', '1:46 p.m.', '2:06 p.m.', '2:26 p.m.', '2:46 p.m.', '3:07 p.m.', '3:31 p.m.', '3:51 p.m.', '4:11 p.m.', '4:31 p.m.', '4:51 p.m.', '5:11 p.m.', '5:31 p.m.', '5:51 p.m.', '6:11 p.m.', '6:31 p.m.', '6:51 p.m.', '7:11 p.m.', '7:31 p.m.', '7:51 p.m.', '8:08 p.m.', '8:24 p.m.', '8:44 p.m.', '9:04 p.m.', '9:24 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B047%2FP47_IMG1.PNG?alt=media&token=166eae37-4bee-4290-b673-f4b2deff02f5' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B047%2FP47_IMG2.PNG?alt=media&token=ed00df68-930f-4d1d-82f3-fb15f6d96e22' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B047%2FP47_IMG3.PNG?alt=media&token=747d4d3a-51e6-4aa1-8b24-c141fc28dcad' }
          ]
        },
        {
          numParada: '48',
          nameParada: 'Cra. 4a X Cll. 34',
          coordinates: {
            latitude: 4.433773,
            longitude: -75.222167
          },
          horariosParada: ['5:24 a.m.', '5:44 a.m.', '6:04 a.m.', '6:24 a.m.', '6:44 a.m.', '7:05 a.m.', '7:31 a.m.', '7:51 a.m.', '8:11 a.m.', '8:31 a.m.', '8:51 a.m.', '9:11 a.m.', '9:31 a.m.', '9:51 a.m.', '10:09 a.m.', '10:26 a.m.', '10:46 a.m.', '11:06 a.m.', '11:26 a.m.', '11:46 a.m.', '12:06 a.m.', '12:26 p.m.', '12:46 p.m.', '1:06 p.m.', '1:26 p.m.', '1:46 p.m.', '2:06 p.m.', '2:26 p.m.', '2:46 p.m.', '3:07 p.m.', '3:31 p.m.', '3:51 p.m.', '4:11 p.m.', '4:31 p.m.', '4:51 p.m.', '5:11 p.m.', '5:31 p.m.', '5:51 p.m.', '6:11 p.m.', '6:31 p.m.', '6:51 p.m.', '7:11 p.m.', '7:31 p.m.', '7:51 p.m.', '8:09 p.m.', '8:24 p.m.', '8:44 p.m.', '9:04 p.m.', '9:24 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B048%2FP48_IMG1.PNG?alt=media&token=c0355a8f-2c2c-49b6-9a6e-af240f0da821' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B048%2FP48_IMG2.PNG?alt=media&token=c6d44836-f51d-481c-9d7c-7a3fe2a2ee35' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B048%2FP48_IMG3.PNG?alt=media&token=7a206c11-03c4-4697-a69b-7fe2fa56c5a2' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B048%2FP48_IMG4.PNG?alt=media&token=c72ede50-6fc0-45fb-8448-aeb6e2c42681' }
          ]
        },
        {
          numParada: '49',
          nameParada: 'Carrera 4a 30-40',
          coordinates: {
            latitude: 4.434339,
            longitude: -75.222939
          },
          horariosParada: ['5:24 a.m.', '5:44 a.m.', '6:04 a.m.', '6:24 a.m.', '6:44 a.m.', '7:06 a.m.', '7:32 a.m.', '7:52 a.m.', '8:12 a.m.', '8:32 a.m.', '8:52 a.m.', '9:12 a.m.', '9:32 a.m.', '9:52 a.m.', '10:10 a.m.', '10:26 a.m.', '10:46 a.m.', '11:06 a.m.', '11:26 a.m.', '11:46 a.m.', '12:06 a.m.', '12:26 p.m.', '12:46 p.m.', '1:06 p.m.', '1:26 p.m.', '1:46 p.m.', '2:06 p.m.', '2:26 p.m.', '2:46 p.m.', '3:07 p.m.', '3:32 p.m.', '3:52 p.m.', '4:12 p.m.', '4:32 p.m.', '4:52 p.m.', '5:12 p.m.', '5:32 p.m.', '5:52 p.m.', '6:12 p.m.', '6:32 p.m.', '6:52 p.m.', '7:12 p.m.', '7:32 p.m.', '7:52 p.m.', '8:09 p.m.', '8:24 p.m.', '8:44 p.m.', '9:04 p.m.', '9:24 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B049%2FP49_IMG1.PNG?alt=media&token=2a6544e2-6e43-42f7-9421-d0b662cd91c0' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B049%2FP49_IMG2.PNG?alt=media&token=84163712-ca0d-4fc1-b4ba-2c7ac3af5082' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B049%2FP49_IMG3.PNG?alt=media&token=205d41a3-d3a8-402a-ad96-7426dbb3889f' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B049%2FP49_IMG4.PNG?alt=media&token=91a08b4f-ab4b-42af-95e4-8c9b333ba035' }
          ]
        },
        {
          numParada: '50',
          nameParada: 'Carrera 4a 311',
          coordinates: {
            latitude: 4.434723,
            longitude: -75.223469
          },
          horariosParada: ['5:24 a.m.', '5:44 a.m.', '6:04 a.m.', '6:24 a.m.', '6:44 a.m.', '7:06 a.m.', '7:32 a.m.', '7:52 a.m.', '8:12 a.m.', '8:32 a.m.', '8:52 a.m.', '9:12 a.m.', '9:32 a.m.', '9:52 a.m.', '10:10 a.m.', '10:26 a.m.', '10:46 a.m.', '11:06 a.m.', '11:26 a.m.', '11:46 a.m.', '12:06 a.m.', '12:26 p.m.', '12:46 p.m.', '1:06 p.m.', '1:26 p.m.', '1:46 p.m.', '2:06 p.m.', '2:26 p.m.', '2:46 p.m.', '3:08 p.m.', '3:32 p.m.', '3:52 p.m.', '4:12 p.m.', '4:32 p.m.', '4:52 p.m.', '5:12 p.m.', '5:32 p.m.', '5:52 p.m.', '6:12 p.m.', '6:32 p.m.', '6:52 p.m.', '7:12 p.m.', '7:32 p.m.', '7:52 p.m.', '8:09 p.m.', '8:24 p.m.', '8:44 p.m.', '9:04 p.m.', '9:24 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B050%2FP50_IMG1.PNG?alt=media&token=89e4d6c4-2fe9-498b-8db6-8a3e56f42d0f' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B050%2FP50_IMG2.PNG?alt=media&token=93a23d43-49c8-415e-842b-b7c993f1ecdd' }
          ]
        },
        {
          numParada: '51',
          nameParada: 'Cra. 4a X Cll. 31',
          coordinates: {
            latitude: 4.435069,
            longitude: -75.223948
          },
          horariosParada: ['5:25 a.m.', '5:45 a.m.', '6:05 a.m.', '6:25 a.m.', '6:45 a.m.', '7:06 a.m.', '7:32 a.m.', '7:52 a.m.', '8:12 a.m.', '8:32 a.m.', '8:52 a.m.', '9:12 a.m.', '9:32 a.m.', '9:52 a.m.', '10:10 a.m.', '10:27 a.m.', '10:47 a.m.', '11:07 a.m.', '11:27 a.m.', '11:47 a.m.', '12:07 a.m.', '12:27 p.m.', '12:47 p.m.', '1:07 p.m.', '1:27 p.m.', '1:47 p.m.', '2:07 p.m.', '2:27 p.m.', '2:47 p.m.', '3:08 p.m.', '3:32 p.m.', '3:52 p.m.', '4:12 p.m.', '4:32 p.m.', '4:52 p.m.', '5:12 p.m.', '5:32 p.m.', '5:52 p.m.', '6:12 p.m.', '6:32 p.m.', '6:52 p.m.', '7:12 p.m.', '7:32 p.m.', '7:52 p.m.', '8:09 p.m.', '8:25 p.m.', '8:45 p.m.', '9:05 p.m.', '9:25 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B051%2FP51_IMG1.PNG?alt=media&token=920d4703-9eef-49d0-8a8d-d0412d339710' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B051%2FP51_IMG2.PNG?alt=media&token=2d45dc67-8741-4b93-afd1-9ff2859bc093' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B051%2FP51_IMG3.PNG?alt=media&token=5dc3b996-b9af-4eb9-bbe4-201c2c995d25' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B051%2FP51_IMG4.PNG?alt=media&token=d0760ab9-38cf-4c94-86c4-938cd383f1ea' }
          ]
        },
        {
          numParada: '52',
          nameParada: 'Carrera 4a 291',
          coordinates: {
            latitude: 4.435658,
            longitude: -75.224755
          },
          horariosParada: ['5:25 a.m.', '5:45 a.m.', '6:05 a.m.', '6:25 a.m.', '6:45 a.m.', '7:06 a.m.', '7:32 a.m.', '7:52 a.m.', '8:12 a.m.', '8:32 a.m.', '8:52 a.m.', '9:12 a.m.', '9:32 a.m.', '9:52 a.m.', '10:10 a.m.', '10:27 a.m.', '10:47 a.m.', '11:07 a.m.', '11:27 a.m.', '11:47 a.m.', '12:07 a.m.', '12:27 p.m.', '12:47 p.m.', '1:07 p.m.', '1:27 p.m.', '1:47 p.m.', '2:07 p.m.', '2:27 p.m.', '2:47 p.m.', '3:08 p.m.', '3:32 p.m.', '3:52 p.m.', '4:12 p.m.', '4:32 p.m.', '4:52 p.m.', '5:12 p.m.', '5:32 p.m.', '5:52 p.m.', '6:12 p.m.', '6:32 p.m.', '6:52 p.m.', '7:12 p.m.', '7:32 p.m.', '7:52 p.m.', '8:10 p.m.', '8:25 p.m.', '8:45 p.m.', '9:05 p.m.', '9:25 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B052%2FP52_IMG1.PNG?alt=media&token=82f461ca-4b95-4992-8586-8be6f5c46d3e' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B052%2FP52_IMG2.PNG?alt=media&token=935efbb9-1e2b-44fa-b862-0ecc3de2f3f1' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B052%2FP52_IMG3.PNG?alt=media&token=dd3ee8bc-7c8d-437f-86ac-e91561e129d1' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B052%2FP52_IMG4.PNG?alt=media&token=09bcbf86-cec7-4003-9d5e-7abb9cc96722' }
          ]
        },
        {
          numParada: '53',
          nameParada: 'Carrera 4a 28a1',
          coordinates: {
            latitude: 4.436085,
            longitude: -75.225368
          },
          horariosParada: ['5:25 a.m.', '5:45 a.m.', '6:05 a.m.', '6:25 a.m.', '6:45 a.m.', '7:07 a.m.', '7:33 a.m.', '7:53 a.m.', '8:13 a.m.', '8:33 a.m.', '8:53 a.m.', '9:13 a.m.', '9:33 a.m.', '9:53 a.m.', '10:11 a.m.', '10:27 a.m.', '10:47 a.m.', '11:07 a.m.', '11:27 a.m.', '11:47 a.m.', '12:07 a.m.', '12:27 p.m.', '12:47 p.m.', '1:07 p.m.', '1:27 p.m.', '1:47 p.m.', '2:07 p.m.', '2:27 p.m.', '2:47 p.m.', '3:09 p.m.', '3:33 p.m.', '3:53 p.m.', '4:13 p.m.', '4:33 p.m.', '4:53 p.m.', '5:13 p.m.', '5:33 p.m.', '5:53 p.m.', '6:13 p.m.', '6:33 p.m.', '6:53 p.m.', '7:13 p.m.', '7:33 p.m.', '7:53 p.m.', '8:10 p.m.', '8:25 p.m.', '8:45 p.m.', '9:05 p.m.', '9:25 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B053%2FP53_IMG1.PNG?alt=media&token=2ba032c2-2a47-4435-b0ff-60332c50f11b' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B053%2FP53_IMG2.PNG?alt=media&token=78868010-5897-46a6-a478-f708b2063a33' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B053%2FP53_IMG3.PNG?alt=media&token=2471b4a7-fd9c-4610-838a-a23656684d5f' }
          ]
        },
        {
          numParada: '54',
          nameParada: 'Carrera 4a 27a39 Pp',
          coordinates: {
            latitude: 4.436526,
            longitude: -75.225896
          },
          horariosParada: ['5:25 a.m.', '5:45 a.m.', '6:05 a.m.', '6:25 a.m.', '6:45 a.m.', '7:07 a.m.', '7:33 a.m.', '7:53 a.m.', '8:13 a.m.', '8:33 a.m.', '8:53 a.m.', '9:13 a.m.', '9:33 a.m.', '9:53 a.m.', '10:11 a.m.', '10:27 a.m.', '10:47 a.m.', '11:07 a.m.', '11:27 a.m.', '11:47 a.m.', '12:07 a.m.', '12:27 p.m.', '12:47 p.m.', '1:07 p.m.', '1:27 p.m.', '1:47 p.m.', '2:07 p.m.', '2:27 p.m.', '2:47 p.m.', '3:09 p.m.', '3:33 p.m.', '3:53 p.m.', '4:13 p.m.', '4:33 p.m.', '4:53 p.m.', '5:13 p.m.', '5:33 p.m.', '5:53 p.m.', '6:13 p.m.', '6:33 p.m.', '6:53 p.m.', '7:13 p.m.', '7:33 p.m.', '7:53 p.m.', '8:10 p.m.', '8:25 p.m.', '8:45 p.m.', '9:05 p.m.', '9:25 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B054%2FP54_IMG1.PNG?alt=media&token=f7a8e3aa-468e-4f89-aa41-e8de498edb82' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B054%2FP54_IMG2.PNG?alt=media&token=28cfee6e-1147-47e9-9744-d00012fe60ea' }
          ]
        },
        {
          numParada: '55',
          nameParada: 'Ferrocaril Pp',
          coordinates: {
            latitude: 4.436910,
            longitude: -75.226698
          },
          horariosParada: ['5:25 a.m.', '5:45 a.m.', '6:05 a.m.', '6:25 a.m.', '6:45 a.m.', '7:07 a.m.', '7:33 a.m.', '7:53 a.m.', '8:13 a.m.', '8:33 a.m.', '8:53 a.m.', '9:13 a.m.', '9:33 a.m.', '9:53 a.m.', '10:11 a.m.', '10:28 a.m.', '10:48 a.m.', '11:08 a.m.', '11:28 a.m.', '11:48 a.m.', '12:08 a.m.', '12:28 p.m.', '12:48 p.m.', '1:08 p.m.', '1:28 p.m.', '1:48 p.m.', '2:08 p.m.', '2:28 p.m.', '2:48 p.m.', '3:09 p.m.', '3:33 p.m.', '3:53 p.m.', '4:13 p.m.', '4:33 p.m.', '4:53 p.m.', '5:13 p.m.', '5:33 p.m.', '5:53 p.m.', '6:13 p.m.', '6:33 p.m.', '6:53 p.m.', '7:13 p.m.', '7:33 p.m.', '7:53 p.m.', '8:10 p.m.', '8:25 p.m.', '8:45 p.m.', '9:05 p.m.', '9:25 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B055%2FP55_IMG1.PNG?alt=media&token=cd8ba1dd-eac8-4ddd-9da1-a82ad2680e55' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B055%2FP55_IMG2.PNG?alt=media&token=119e3910-1f96-4dbb-b7cc-477d75e4794e' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B055%2FP55_IMG3.PNG?alt=media&token=50e35fba-68fb-4b8b-a23f-5e2ea4022e40' }
          ]
        },
        {
          numParada: '56',
          nameParada: 'Ferrocaril Pp',
          coordinates: {
            latitude: 4.436948,
            longitude: -75.227698
          },
          horariosParada: ['5:26 a.m.', '5:46 a.m.', '6:06 a.m.', '6:26 a.m.', '6:46 a.m.', '7:08 a.m.', '7:34 a.m.', '7:54 a.m.', '8:14 a.m.', '8:34 a.m.', '8:54 a.m.', '9:14 a.m.', '9:34 a.m.', '9:54 a.m.', '10:11 a.m.', '10:28 a.m.', '10:48 a.m.', '11:08 a.m.', '11:28 a.m.', '11:48 a.m.', '12:08 a.m.', '12:28 p.m.', '12:48 p.m.', '1:08 p.m.', '1:28 p.m.', '1:48 p.m.', '2:08 p.m.', '2:28 p.m.', '2:48 p.m.', '3:10 p.m.', '3:34 p.m.', '3:54 p.m.', '4:14 p.m.', '4:34 p.m.', '4:54 p.m.', '5:14 p.m.', '5:34 p.m.', '5:54 p.m.', '6:14 p.m.', '6:34 p.m.', '6:54 p.m.', '7:14 p.m.', '7:34 p.m.', '7:54 p.m.', '8:10 p.m.', '8:26 p.m.', '8:46 p.m.', '9:06 p.m.', '9:26 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B056%2FP56_IMG1.PNG?alt=media&token=8d09997f-3e1c-4171-a2cc-d456012bbba3' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B056%2FP56_IMG2.PNG?alt=media&token=a9481979-5f5e-4fb4-8ab5-65b0d53ff9d3' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B056%2FP56_IMG3.PNG?alt=media&token=1a9de512-8941-414d-a7d9-00586e4f5e62' }
          ]
        },
        {
          numParada: '57',
          nameParada: 'Av. Ferrocarril X Cra. 4',
          coordinates: {
            latitude: 4.437042,
            longitude: -75.228558
          },
          horariosParada: ['5:26 a.m.', '5:46 a.m.', '6:06 a.m.', '6:26 a.m.', '6:46 a.m.', '7:08 a.m.', '7:34 a.m.', '7:54 a.m.', '8:14 a.m.', '8:34 a.m.', '8:54 a.m.', '9:14 a.m.', '9:34 a.m.', '9:54 a.m.', '10:12 a.m.', '10:28 a.m.', '10:48 a.m.', '11:08 a.m.', '11:28 a.m.', '11:48 a.m.', '12:08 a.m.', '12:28 p.m.', '12:48 p.m.', '1:08 p.m.', '1:28 p.m.', '1:48 p.m.', '2:08 p.m.', '2:28 p.m.', '2:48 p.m.', '3:10 p.m.', '3:34 p.m.', '3:54 p.m.', '4:14 p.m.', '4:34 p.m.', '4:54 p.m.', '5:14 p.m.', '5:34 p.m.', '5:54 p.m.', '6:14 p.m.', '6:34 p.m.', '6:54 p.m.', '7:14 p.m.', '7:34 p.m.', '7:54 p.m.', '8:11 p.m.', '8:26 p.m.', '8:46 p.m.', '9:06 p.m.', '9:26 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B057%2FP57_IMG1.PNG?alt=media&token=86a8c746-103c-4f86-81a7-48ce64d8e12c' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B057%2FP57_IMG2.PNG?alt=media&token=c8fb6c41-0fe5-4a0e-82bd-18f5c8ad03ca' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B057%2FP57_IMG3.PNG?alt=media&token=e2ce9ee7-eb49-46e9-abba-bcd4a39a0caf' }
          ]
        },
        {
          numParada: '58',
          nameParada: 'Ferrocarril Pp',
          coordinates: {
            latitude: 4.437069,
            longitude: -75.229537
          },
          horariosParada: ['5:26 a.m.', '5:46 a.m.', '6:06 a.m.', '6:26 a.m.', '6:46 a.m.', '7:08 a.m.', '7:34 a.m.', '7:54 a.m.', '8:14 a.m.', '8:34 a.m.', '8:54 a.m.', '9:14 a.m.', '9:34 a.m.', '9:54 a.m.', '10:12 a.m.', '10:29 a.m.', '10:49 a.m.', '11:09 a.m.', '11:29 a.m.', '11:49 a.m.', '12:09 a.m.', '12:29 p.m.', '12:49 p.m.', '1:09 p.m.', '1:29 p.m.', '1:49 p.m.', '2:09 p.m.', '2:29 p.m.', '2:49 p.m.', '3:10 p.m.', '3:34 p.m.', '3:54 p.m.', '4:14 p.m.', '4:34 p.m.', '4:54 p.m.', '5:14 p.m.', '5:34 p.m.', '5:54 p.m.', '6:14 p.m.', '6:34 p.m.', '6:54 p.m.', '7:14 p.m.', '7:34 p.m.', '7:54 p.m.', '8:11 p.m.', '8:26 p.m.', '8:46 p.m.', '9:06 p.m.', '9:26 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B058%2FP58_IMG1.PNG?alt=media&token=21327ef5-71b8-4ddf-80d8-1abe4e420d1e' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B058%2FP58_IMG2.PNG?alt=media&token=37dd1645-2249-4444-bb34-2bc0715664eb' }
          ]
        },
        {
          numParada: '59',
          nameParada: 'Av. Ferrocarril Cra. 2',
          coordinates: {
            latitude: 4.437146,
            longitude: -75.230823
          },
          horariosParada: ['5:27 a.m.', '5:47 a.m.', '6:07 a.m.', '6:27 a.m.', '6:47 a.m.', '7:09 a.m.', '7:35 a.m.', '7:55 a.m.', '8:15 a.m.', '8:35 a.m.', '8:55 a.m.', '9:15 a.m.', '9:35 a.m.', '9:55 a.m.', '10:12 a.m.', '10:29 a.m.', '10:49 a.m.', '11:09 a.m.', '11:29 a.m.', '11:49 a.m.', '12:09 a.m.', '12:29 p.m.', '12:49 p.m.', '1:09 p.m.', '1:29 p.m.', '1:49 p.m.', '2:09 p.m.', '2:29 p.m.', '2:49 p.m.', '3:11 p.m.', '3:35 p.m.', '3:55 p.m.', '4:15 p.m.', '4:35 p.m.', '4:55 p.m.', '5:15 p.m.', '5:35 p.m.', '5:55 p.m.', '6:15 p.m.', '6:35 p.m.', '6:55 p.m.', '7:15 p.m.', '7:35 p.m.', '7:55 p.m.', '8:11 p.m.', '8:27 p.m.', '8:47 p.m.', '9:07 p.m.', '9:27 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B059%2FP59_IMG1.PNG?alt=media&token=b0f98699-d35c-4b72-ac3b-7ccb4a715f1c' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B059%2FP59_IMG2.PNG?alt=media&token=a652cfe7-d156-4cc5-bc16-694331fdd3e4' }
          ]
        },
        {
          numParada: '60',
          nameParada: 'Comando Policia Ibagué',
          coordinates: {
            latitude: 4.437218,
            longitude: -75.232460
          },
          horariosParada: ['5:27 a.m.', '5:47 a.m.', '6:07 a.m.', '6:27 a.m.', '6:47 a.m.', '7:09 a.m.', '7:35 a.m.', '7:55 a.m.', '8:15 a.m.', '8:35 a.m.', '8:55 a.m.', '9:15 a.m.', '9:35 a.m.', '9:55 a.m.', '10:13 a.m.', '10:29 a.m.', '10:49 a.m.', '11:09 a.m.', '11:29 a.m.', '11:49 a.m.', '12:09 a.m.', '12:29 p.m.', '12:49 p.m.', '1:09 p.m.', '1:29 p.m.', '1:49 p.m.', '2:09 p.m.', '2:29 p.m.', '2:49 p.m.', '3:11 p.m.', '3:35 p.m.', '3:55 p.m.', '4:15 p.m.', '4:35 p.m.', '4:55 p.m.', '5:15 p.m.', '5:35 p.m.', '5:55 p.m.', '6:15 p.m.', '6:35 p.m.', '6:55 p.m.', '7:15 p.m.', '7:35 p.m.', '7:55 p.m.', '8:12 p.m.', '8:27 p.m.', '8:47 p.m.', '9:07 p.m.', '9:27 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B060%2FP60_IMG1.PNG?alt=media&token=3e07ebc2-826c-4229-a544-6890fc9229f5' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B060%2FP60_IMG2.PNG?alt=media&token=eac39bdc-bdd0-4325-9fba-686f87e3e27f' }
          ]
        },
        {
          numParada: '61',
          nameParada: 'Ferrocarril Pp',
          coordinates: {
            latitude: 4.437775,
            longitude: -75.233570
          },
          horariosParada: ['5:28 a.m.', '5:48 a.m.', '6:08 a.m.', '6:28 a.m.', '6:48 a.m.', '7:10 a.m.', '7:36 a.m.', '7:56 a.m.', '8:16 a.m.', '8:36 a.m.', '8:56 a.m.', '9:16 a.m.', '9:36 a.m.', '9:56 a.m.', '10:13 a.m.', '10:30 a.m.', '10:50 a.m.', '11:10 a.m.', '11:30 a.m.', '11:50 a.m.', '12:10 a.m.', '12:30 p.m.', '12:50 p.m.', '1:10 p.m.', '1:30 p.m.', '1:50 p.m.', '2:10 p.m.', '2:30 p.m.', '2:50 p.m.', '3:12 p.m.', '3:36 p.m.', '3:56 p.m.', '4:16 p.m.', '4:36 p.m.', '4:56 p.m.', '5:16 p.m.', '5:36 p.m.', '5:56 p.m.', '6:16 p.m.', '6:36 p.m.', '6:56 p.m.', '7:16 p.m.', '7:36 p.m.', '7:56 p.m.', '8:12 p.m.', '8:28 p.m.', '8:48 p.m.', '9:08 p.m.', '9:28 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B061%2FP61_IMG1.PNG?alt=media&token=5b7690ea-e766-4600-8bcc-1c53b8801b9d' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B061%2FP61_IMG2.PNG?alt=media&token=62252d61-67b9-4788-8e51-c4bf7c1814a0' }
          ]
        },
        {
          numParada: '62',
          nameParada: 'Av. Ferrocarril X Cll. 20',
          coordinates: {
            latitude: 4.437834,
            longitude: -75.233926
          },
          horariosParada: ['5:28 a.m.', '5:48 a.m.', '6:08 a.m.', '6:28 a.m.', '6:48 a.m.', '7:10 a.m.', '7:36 a.m.', '7:56 a.m.', '8:16 a.m.', '8:36 a.m.', '8:56 a.m.', '9:16 a.m.', '9:36 a.m.', '9:56 a.m.', '10:13 a.m.', '10:30 a.m.', '10:50 a.m.', '11:10 a.m.', '11:30 a.m.', '11:50 a.m.', '12:10 a.m.', '12:30 p.m.', '12:50 p.m.', '1:10 p.m.', '1:30 p.m.', '1:50 p.m.', '2:10 p.m.', '2:30 p.m.', '2:50 p.m.', '3:12 p.m.', '3:36 p.m.', '3:56 p.m.', '4:16 p.m.', '4:36 p.m.', '4:56 p.m.', '5:16 p.m.', '5:36 p.m.', '5:56 p.m.', '6:16 p.m.', '6:36 p.m.', '6:56 p.m.', '7:16 p.m.', '7:36 p.m.', '7:56 p.m.', '8:12 p.m.', '8:28 p.m.', '8:48 p.m.', '9:08 p.m.', '9:28 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B062%2FP62_IMG1.PNG?alt=media&token=0653e80f-0323-4255-bffb-2b17fbbbc1dd' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B062%2FP62_IMG2.PNG?alt=media&token=db2bc72a-9615-46cc-b3ff-112ba2da8024' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B062%2FP62_IMG3.PNG?alt=media&token=f7719ad4-e36f-4b06-867c-b17122364001' }
          ]
        },
        {
          numParada: '63',
          nameParada: 'Carrera 2 2018',
          coordinates: {
            latitude: 4.437906,
            longitude: -75.234811
          },
          horariosParada: ['5:28 a.m.', '5:48 a.m.', '6:08 a.m.', '6:28 a.m.', '6:48 a.m.', '7:10 a.m.', '7:36 a.m.', '7:56 a.m.', '8:16 a.m.', '8:36 a.m.', '8:56 a.m.', '9:16 a.m.', '9:36 a.m.', '9:56 a.m.', '10:14 a.m.', '10:30 a.m.', '10:50 a.m.', '11:10 a.m.', '11:30 a.m.', '11:50 a.m.', '12:10 a.m.', '12:30 p.m.', '12:50 p.m.', '1:10 p.m.', '1:30 p.m.', '1:50 p.m.', '2:10 p.m.', '2:30 p.m.', '2:50 p.m.', '3:12 p.m.', '3:36 p.m.', '3:56 p.m.', '4:16 p.m.', '4:36 p.m.', '4:56 p.m.', '5:16 p.m.', '5:36 p.m.', '5:56 p.m.', '6:16 p.m.', '6:36 p.m.', '6:56 p.m.', '7:16 p.m.', '7:36 p.m.', '7:56 p.m.', '8:13 p.m.', '8:28 p.m.', '8:48 p.m.', '9:08 p.m.', '9:28 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B063%2FP63_IMG1.PNG?alt=media&token=c901f4f5-1968-434d-b9b4-f85d6948d2e0' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B063%2FP63_IMG2.PNG?alt=media&token=e3d53038-7bdf-437b-9cf4-b400b1645e37' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B063%2FP63_IMG3.PNG?alt=media&token=9dbb103d-645e-4c0e-86ee-f3814c4dc605' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B063%2FP63_IMG4.PNG?alt=media&token=adfb5d47-a11a-4334-9fe7-2a1121a41926' }
          ]
        },
        {
          numParada: '64',
          nameParada: 'Calle 19a 1a2',
          coordinates: {
            latitude: 4.437726,
            longitude: -75.235203
          },
          horariosParada: ['5:28 a.m.', '5:48 a.m.', '6:08 a.m.', '6:28 a.m.', '6:48 a.m.', '7:10 a.m.', '7:37 a.m.', '7:57 a.m.', '8:17 a.m.', '8:37 a.m.', '8:57 a.m.', '9:17 a.m.', '9:37 a.m.', '9:57 a.m.', '10:14 a.m.', '10:30 a.m.', '10:50 a.m.', '11:10 a.m.', '11:30 a.m.', '11:50 a.m.', '12:10 a.m.', '12:30 p.m.', '12:50 p.m.', '1:10 p.m.', '1:30 p.m.', '1:50 p.m.', '2:10 p.m.', '2:30 p.m.', '2:50 p.m.', '3:12 p.m.', '3:37 p.m.', '3:57 p.m.', '4:17 p.m.', '4:37 p.m.', '4:57 p.m.', '5:17 p.m.', '5:37 p.m.', '5:57 p.m.', '6:17 p.m.', '6:37 p.m.', '6:57 p.m.', '7:17 p.m.', '7:37 p.m.', '7:57 p.m.', '8:13 p.m.', '8:28 p.m.', '8:48 p.m.', '9:08 p.m.', '9:28 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B064%2FP64_IMG1.PNG?alt=media&token=52dfcede-c3f1-438f-be7d-c806f15ecb6b' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B064%2FP64_IMG2.PNG?alt=media&token=28f131b8-ad03-45cc-a966-39c35f46711a' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B064%2FP64_IMG3.PNG?alt=media&token=43755900-57a9-495f-bb1b-17f6002a58e0' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B064%2FP64_IMG4.PNG?alt=media&token=7e688b6b-5403-462e-97db-6b4d4920878d' }
          ]
        },
        {
          numParada: '65',
          nameParada: 'Cra. 1 X Cll. 18',
          coordinates: {
            latitude: 4.437735,
            longitude: -75.236583
          },
          horariosParada: ['5:28 a.m.', '5:48 a.m.', '6:08 a.m.', '6:28 a.m.', '6:48 a.m.', '7:11 a.m.', '7:37 a.m.', '7:57 a.m.', '8:17 a.m.', '8:37 a.m.', '8:57 a.m.', '9:17 a.m.', '9:37 a.m.', '9:57 a.m.', '10:14 a.m.', '10:31 a.m.', '10:51 a.m.', '11:11 a.m.', '11:31 a.m.', '11:51 a.m.', '12:11 a.m.', '12:31 p.m.', '12:51 p.m.', '1:11 p.m.', '1:31 p.m.', '1:51 p.m.', '2:11 p.m.', '2:31 p.m.', '2:51 p.m.', '3:13 p.m.', '3:37 p.m.', '3:57 p.m.', '4:17 p.m.', '4:37 p.m.', '4:57 p.m.', '5:17 p.m.', '5:37 p.m.', '5:57 p.m.', '6:17 p.m.', '6:37 p.m.', '6:57 p.m.', '7:17 p.m.', '7:37 p.m.', '7:57 p.m.', '8:13 p.m.', '8:28 p.m.', '8:48 p.m.', '9:08 p.m.', '9:28 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B065%2FP65_IMG1.PNG?alt=media&token=a297ca5d-5b0f-4217-8354-fa7c80eb0f0a' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B065%2FP65_IMG2.PNG?alt=media&token=4edf3ee5-7b67-4490-b465-def64ca788a9' }
          ]
        },
        {
          numParada: '66',
          nameParada: 'Laosera3',
          coordinates: {
            latitude: 4.438073,
            longitude: -75.237073
          },
          horariosParada: ['5:29 a.m.', '5:49 a.m.', '6:09 a.m.', '6:29 a.m.', '6:49 a.m.', '7:11 a.m.', '7:37 a.m.', '7:57 a.m.', '8:17 a.m.', '8:37 a.m.', '8:57 a.m.', '9:17 a.m.', '9:37 a.m.', '9:57 a.m.', '10:14 a.m.', '10:31 a.m.', '10:51 a.m.', '11:11 a.m.', '11:31 a.m.', '11:51 a.m.', '12:11 a.m.', '12:31 p.m.', '12:51 p.m.', '1:11 p.m.', '1:31 p.m.', '1:51 p.m.', '2:11 p.m.', '2:31 p.m.', '2:51 p.m.', '3:13 p.m.', '3:37 p.m.', '3:57 p.m.', '4:17 p.m.', '4:37 p.m.', '4:57 p.m.', '5:17 p.m.', '5:37 p.m.', '5:57 p.m.', '6:17 p.m.', '6:37 p.m.', '6:57 p.m.', '7:17 p.m.', '7:37 p.m.', '7:57 p.m.', '8:13 p.m.', '8:29 p.m.', '8:49 p.m.', '9:09 p.m.', '9:29 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B066%2FP66_IMG1.PNG?alt=media&token=646f9956-5c8c-4eba-add6-7782d24cc8a8' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B066%2FP66_IMG2.PNG?alt=media&token=d9c7da80-9618-4b4d-bfc7-e28da1981f67' }
          ]
        },
        {
          numParada: '67',
          nameParada: 'Carrera 1 171 Pp',
          coordinates: {
            latitude: 4.438480,
            longitude: -75.237512
          },
          horariosParada: ['5:29 a.m.', '5:49 a.m.', '6:09 a.m.', '6:29 a.m.', '6:49 a.m.', '7:11 a.m.', '7:37 a.m.', '7:57 a.m.', '8:17 a.m.', '8:37 a.m.', '8:57 a.m.', '9:17 a.m.', '9:37 a.m.', '9:57 a.m.', '10:15 a.m.', '10:31 a.m.', '10:51 a.m.', '11:11 a.m.', '11:31 a.m.', '11:51 a.m.', '12:11 a.m.', '12:31 p.m.', '12:51 p.m.', '1:11 p.m.', '1:31 p.m.', '1:51 p.m.', '2:11 p.m.', '2:31 p.m.', '2:51 p.m.', '3:13 p.m.', '3:37 p.m.', '3:57 p.m.', '4:17 p.m.', '4:37 p.m.', '4:57 p.m.', '5:17 p.m.', '5:37 p.m.', '5:57 p.m.', '6:17 p.m.', '6:37 p.m.', '6:57 p.m.', '7:17 p.m.', '7:37 p.m.', '7:57 p.m.', '8:13 p.m.', '8:29 p.m.', '8:49 p.m.', '9:09 p.m.', '9:29 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B067%2FP67_IMG1.PNG?alt=media&token=0eb3b20f-ed0e-4fbc-b5d8-8b5f15510556' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B067%2FP67_IMG2.PNG?alt=media&token=5b8083fe-fb3f-4f98-a091-50e79b198d4d' }
          ]
        },
        {
          numParada: '68',
          nameParada: 'Carrera 1 161 Pp',
          coordinates: {
            latitude: 4.439388,
            longitude: -75.238260
          },
          horariosParada: ['5:29 a.m.', '5:49 a.m.', '6:09 a.m.', '6:29 a.m.', '6:49 a.m.', '7:12 a.m.', '7:38 a.m.', '7:58 a.m.', '8:18 a.m.', '8:38 a.m.', '8:58 a.m.', '9:18 a.m.', '9:38 a.m.', '9:58 a.m.', '10:15 a.m.', '10:31 a.m.', '10:51 a.m.', '11:11 a.m.', '11:31 a.m.', '11:51 a.m.', '12:11 a.m.', '12:31 p.m.', '12:51 p.m.', '1:11 p.m.', '1:31 p.m.', '1:51 p.m.', '2:11 p.m.', '2:31 p.m.', '2:51 p.m.', '3:14 p.m.', '3:38 p.m.', '3:58 p.m.', '4:18 p.m.', '4:38 p.m.', '4:58 p.m.', '5:18 p.m.', '5:38 p.m.', '5:58 p.m.', '6:18 p.m.', '6:38 p.m.', '6:58 p.m.', '7:18 p.m.', '7:38 p.m.', '7:58 p.m.', '8:14 p.m.', '8:29 p.m.', '8:49 p.m.', '9:09 p.m.', '9:29 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B068%2FP68_IMG1.PNG?alt=media&token=0c0c23ea-c398-4d99-96ab-2590c8dda9ad' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B068%2FP68_IMG2.PNG?alt=media&token=c12670e8-9d59-4ece-8bcc-0cfc94919e50' }
          ]
        },
        {
          numParada: '69',
          nameParada: 'Carrera 1 X Cll. 16',
          coordinates: {
            latitude: 4.439628,
            longitude: -75.238459
          },
          horariosParada: ['5:29 a.m.', '5:49 a.m.', '6:09 a.m.', '6:29 a.m.', '6:49 a.m.', '7:12 a.m.', '7:38 a.m.', '7:58 a.m.', '8:18 a.m.', '8:38 a.m.', '8:58 a.m.', '9:18 a.m.', '9:38 a.m.', '9:58 a.m.', '10:15 a.m.', '10:32 a.m.', '10:52 a.m.', '11:12 a.m.', '11:32 a.m.', '11:52 a.m.', '12:12 a.m.', '12:32 p.m.', '12:52 p.m.', '1:12 p.m.', '1:32 p.m.', '1:52 p.m.', '2:12 p.m.', '2:32 p.m.', '2:52 p.m.', '3:14 p.m.', '3:38 p.m.', '3:58 p.m.', '4:18 p.m.', '4:38 p.m.', '4:58 p.m.', '5:18 p.m.', '5:38 p.m.', '5:58 p.m.', '6:18 p.m.', '6:38 p.m.', '6:58 p.m.', '7:18 p.m.', '7:38 p.m.', '7:58 p.m.', '8:14 p.m.', '8:29 p.m.', '8:49 p.m.', '9:09 p.m.', '9:29 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B069%2FP69_IMG1.PNG?alt=media&token=b4702441-5914-4a07-bdda-8ef0fb803bf8' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B069%2FP69_IMG2.PNG?alt=media&token=abe7f950-c924-423a-afa2-82baade0ed0f' }
          ]
        },
        {
          numParada: '70',
          nameParada: 'Carrera 1 151',
          coordinates: {
            latitude: 4.440174,
            longitude: -75.238845
          },
          horariosParada: ['5:29 a.m.', '5:49 a.m.', '6:09 a.m.', '6:29 a.m.', '6:49 a.m.', '7:12 a.m.', '7:38 a.m.', '7:58 a.m.', '8:18 a.m.', '8:38 a.m.', '8:58 a.m.', '9:18 a.m.', '9:38 a.m.', '9:58 a.m.', '10:15 a.m.', '10:32 a.m.', '10:52 a.m.', '11:12 a.m.', '11:32 a.m.', '11:52 a.m.', '12:12 a.m.', '12:32 p.m.', '12:52 p.m.', '1:12 p.m.', '1:32 p.m.', '1:52 p.m.', '2:12 p.m.', '2:32 p.m.', '2:52 p.m.', '3:14 p.m.', '3:38 p.m.', '3:58 p.m.', '4:18 p.m.', '4:38 p.m.', '4:58 p.m.', '5:18 p.m.', '5:38 p.m.', '5:58 p.m.', '6:18 p.m.', '6:38 p.m.', '6:58 p.m.', '7:18 p.m.', '7:38 p.m.', '7:58 p.m.', '8:14 p.m.', '8:29 p.m.', '8:49 p.m.', '9:09 p.m.', '9:29 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B070%2FP70_IMG1.PNG?alt=media&token=48f7b2b7-5e90-4cc0-8af9-8b8d97f18b1d' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B070%2FP70_IMG2.PNG?alt=media&token=ddc4bd7d-d575-4a37-a943-67d2f507d0bf' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B070%2FP70_IMG3.PNG?alt=media&token=63f1f25a-309d-449d-9a5c-ed1bad5e61ee' }
          ]
        },
        {
          numParada: '71',
          nameParada: 'Cll. 15 X Cra. 2 - 3',
          coordinates: {
            latitude: 4.441489,
            longitude: -75.238660
          },
          horariosParada: ['5:30 a.m.', '5:50 a.m.', '6:10 a.m.', '6:30 a.m.', '6:50 a.m.', '7:13 a.m.', '7:39 a.m.', '7:59 a.m.', '8:19 a.m.', '8:39 a.m.', '8:59 a.m.', '9:19 a.m.', '9:39 a.m.', '9:59 a.m.', '10:15 a.m.', '10:32 a.m.', '10:52 a.m.', '11:12 a.m.', '11:32 a.m.', '11:52 a.m.', '12:12 a.m.', '12:32 p.m.', '12:52 p.m.', '1:12 p.m.', '1:32 p.m.', '1:52 p.m.', '2:12 p.m.', '2:32 p.m.', '2:52 p.m.', '3:15 p.m.', '3:39 p.m.', '3:59 p.m.', '4:19 p.m.', '4:39 p.m.', '4:59 p.m.', '5:19 p.m.', '5:39 p.m.', '5:59 p.m.', '6:19 p.m.', '6:39 p.m.', '6:59 p.m.', '7:19 p.m.', '7:39 p.m.', '7:59 p.m.', '8:14 p.m.', '8:30 p.m.', '8:50 p.m.', '9:10 p.m.', '9:30 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B071%2FP71_IMG1.PNG?alt=media&token=3afa3132-edbc-470a-9952-6bd2500a54af' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B071%2FP71_IMG2.PNG?alt=media&token=b9fc8772-fb62-41f5-9c23-6a80ca2cc6f6' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B071%2FP71_IMG3.PNG?alt=media&token=85887f44-937c-44d6-8220-e35d39ab1827' }
          ]
        },
        {
          numParada: '72',
          nameParada: 'Cll. 15 X Cra. 3 - 4',
          coordinates: {
            latitude: 4.442521,
            longitude: -75.237841
          },
          horariosParada: ['5:30 a.m.', '5:50 a.m.', '6:10 a.m.', '6:30 a.m.', '6:50 a.m.', '7:13 a.m.', '7:39 a.m.', '7:59 a.m.', '8:19 a.m.', '8:39 a.m.', '8:59 a.m.', '9:19 a.m.', '9:39 a.m.', '9:59 a.m.', '10:16 a.m.', '10:33 a.m.', '10:53 a.m.', '11:13 a.m.', '11:33 a.m.', '11:53 a.m.', '12:13 a.m.', '12:33 p.m.', '12:53 p.m.', '1:13 p.m.', '1:33 p.m.', '1:53 p.m.', '2:13 p.m.', '2:33 p.m.', '2:53 p.m.', '3:15 p.m.', '3:39 p.m.', '3:59 p.m.', '4:19 p.m.', '4:39 p.m.', '4:59 p.m.', '5:19 p.m.', '5:39 p.m.', '5:59 p.m.', '6:19 p.m.', '6:39 p.m.', '6:59 p.m.', '7:19 p.m.', '7:39 p.m.', '7:59 p.m.', '8:15 p.m.', '8:30 p.m.', '8:50 p.m.', '9:10 p.m.', '9:30 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B072%2FP72_IMG1.PNG?alt=media&token=ce580838-ecee-4250-a9f3-8f10fd2bcdc0' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B072%2FP72_IMG2.PNG?alt=media&token=caa304bc-8163-49a8-812e-6d0289ef63e7' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B072%2FP72_IMG3.PNG?alt=media&token=77c53b06-b229-42b0-b118-d862ed08d0a2' }
          ]
        },
        {
          numParada: '73',
          nameParada: 'Cll. 15 X Cra. 4 - 5',
          coordinates: {
            latitude: 4.443427,
            longitude: -75.237171
          },
          horariosParada: ['5:30 a.m.', '5:50 a.m.', '6:10 a.m.', '6:30 a.m.', '6:50 a.m.', '7:14 a.m.', '7:40 a.m.', '8:00 a.m.', '8:20 a.m.', '8:40 a.m.', '9:00 a.m.', '9:20 a.m.', '9:40 a.m.', '10:00 a.m.', '10:16 a.m.', '10:33 a.m.', '10:53 a.m.', '11:13 a.m.', '11:33 a.m.', '11:53 a.m.', '12:13 a.m.', '12:33 p.m.', '12:53 p.m.', '1:13 p.m.', '1:33 p.m.', '1:53 p.m.', '2:13 p.m.', '2:33 p.m.', '2:53 p.m.', '3:16 p.m.', '3:40 p.m.', '4:00 p.m.', '4:20 p.m.', '4:40 p.m.', '5:00 p.m.', '5:20 p.m.', '5:40 p.m.', '6:00 p.m.', '6:20 p.m.', '6:40 p.m.', '7:00 p.m.', '7:20 p.m.', '7:40 p.m.', '8:00 p.m.', '8:15 p.m.', '8:30 p.m.', '8:50 p.m.', '9:10 p.m.', '9:30 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B073%2FP73_IMG1.PNG?alt=media&token=fa06e17f-950f-4e79-9e94-d05bd34da6c9' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B073%2FP73_IMG2.PNG?alt=media&token=0623337a-e31a-4625-ba1b-635626a9c96d' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B073%2FP73_IMG3.PNG?alt=media&token=60e5b430-1b80-48b7-afad-2999fb523001' }
          ]
        },
        {
          numParada: '74',
          nameParada: 'Cll. 15 X Cra. 6',
          coordinates: {
            latitude: 4.444386,
            longitude: -75.236568
          },
          horariosParada: ['5:31 a.m.', '5:51 a.m.', '6:11 a.m.', '6:31 a.m.', '6:51 a.m.', '7:14 a.m.', '7:40 a.m.', '8:00 a.m.', '8:20 a.m.', '8:40 a.m.', '9:00 a.m.', '9:20 a.m.', '9:40 a.m.', '10:00 a.m.', '10:17 a.m.', '10:33 a.m.', '10:53 a.m.', '11:13 a.m.', '11:33 a.m.', '11:53 a.m.', '12:13 a.m.', '12:33 p.m.', '12:53 p.m.', '1:13 p.m.', '1:33 p.m.', '1:53 p.m.', '2:13 p.m.', '2:33 p.m.', '2:53 p.m.', '3:16 p.m.', '3:40 p.m.', '4:00 p.m.', '4:20 p.m.', '4:40 p.m.', '5:00 p.m.', '5:20 p.m.', '5:40 p.m.', '6:00 p.m.', '6:20 p.m.', '6:40 p.m.', '7:00 p.m.', '7:20 p.m.', '7:40 p.m.', '8:00 p.m.', '8:15 p.m.', '8:31 p.m.', '8:51 p.m.', '9:11 p.m.', '9:31 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B074%2FP74_IMG1.PNG?alt=media&token=d3d905c7-7b78-4cf1-94cf-af85dfcd193c' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B074%2FP74_IMG2.PNG?alt=media&token=18eade8b-60f0-475b-a470-a17c722ceb37' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B074%2FP74_IMG3.PNG?alt=media&token=645edc15-5c9d-476c-86de-0eef1139e7ba' }
          ]
        },
        {
          numParada: '75',
          nameParada: 'Sexta Brigada (Cra. 8 X Cll. 12)',
          coordinates: {
            latitude: 4.447438,
            longitude: -75.238502
          },
          horariosParada: ['5:32 a.m.', '5:52 a.m.', '6:12 a.m.', '6:32 a.m.', '6:52 a.m.', '7:15 a.m.', '7:41 a.m.', '8:01 a.m.', '8:21 a.m.', '8:41 a.m.', '9:01 a.m.', '9:21 a.m.', '9:41 a.m.', '10:01 a.m.', '10:18 a.m.', '10:34 a.m.', '10:54 a.m.', '11:14 a.m.', '11:34 a.m.', '11:54 a.m.', '12:14 a.m.', '12:34 p.m.', '12:54 p.m.', '1:14 p.m.', '1:34 p.m.', '1:54 p.m.', '2:14 p.m.', '2:34 p.m.', '2:54 p.m.', '3:17 p.m.', '3:41 p.m.', '4:01 p.m.', '4:21 p.m.', '4:41 p.m.', '5:01 p.m.', '5:21 p.m.', '5:41 p.m.', '6:01 p.m.', '6:21 p.m.', '6:41 p.m.', '7:01 p.m.', '7:21 p.m.', '7:41 p.m.', '8:01 p.m.', '8:16 p.m.', '8:32 p.m.', '8:52 p.m.', '9:12 p.m.', '9:32 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B075%2FP75_IMG1.PNG?alt=media&token=28c99df7-0611-4850-b7c2-1bad4ec2826f' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B075%2FP75_IMG2.PNG?alt=media&token=b24c36e1-ea3f-43d0-827f-3d06a6a6c135' }
          ]
        },
        {
          numParada: '76',
          nameParada: 'Museo Panóptico (Cra. 8 X Cll. 10)',
          coordinates: {
            latitude: 4.447950,
            longitude: -75.240745
          },
          horariosParada: ['5:32 a.m.', '5:52 a.m.', '6:12 a.m.', '6:32 a.m.', '6:52 a.m.', '7:16 a.m.', '7:42 a.m.', '8:02 a.m.', '8:22 a.m.', '8:42 a.m.', '9:02 a.m.', '9:22 a.m.', '9:42 a.m.', '10:02 a.m.', '10:19 a.m.', '10:35 a.m.', '10:55 a.m.', '11:15 a.m.', '11:35 a.m.', '11:55 a.m.', '12:15 a.m.', '12:35 p.m.', '12:55 p.m.', '1:15 p.m.', '1:35 p.m.', '1:55 p.m.', '2:15 p.m.', '2:35 p.m.', '2:55 p.m.', '3:18 p.m.', '3:42 p.m.', '4:02 p.m.', '4:22 p.m.', '4:42 p.m.', '5:02 p.m.', '5:22 p.m.', '5:42 p.m.', '6:02 p.m.', '6:22 p.m.', '6:42 p.m.', '7:02 p.m.', '7:22 p.m.', '7:42 p.m.', '8:02 p.m.', '8:17 p.m.', '8:32 p.m.', '8:52 p.m.', '9:12 p.m.', '9:32 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B076%2FP76_IMG1.PNG?alt=media&token=632bea45-ae1a-41ab-a54a-bff2544211b4' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B076%2FP76_IMG2.PNG?alt=media&token=ff976b15-c245-4ed2-b63d-a3e3179e6078' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B076%2FP76_IMG3.PNG?alt=media&token=e01ab10d-8eb6-49de-99b4-44bbfdfd63a4' }
          ]
        },
        {
          numParada: '77',
          nameParada: '20 De Julio (Cll. 11 X Cra. 12)',
          coordinates: {
            latitude: 4.450974,
            longitude: -75.239110
          },
          horariosParada: ['5:33 a.m.', '5:53 a.m.', '6:13 a.m.', '6:33 a.m.', '6:53 a.m.', '7:17 a.m.', '7:44 a.m.', '8:04 a.m.', '8:24 a.m.', '8:44 a.m.', '9:04 a.m.', '9:24 a.m.', '9:44 a.m.', '10:03 a.m.', '10:20 a.m.', '10:36 a.m.', '10:56 a.m.', '11:16 a.m.', '11:36 a.m.', '11:56 a.m.', '12:16 a.m.', '12:36 p.m.', '12:56 p.m.', '1:16 p.m.', '1:36 p.m.', '1:56 p.m.', '2:16 p.m.', '2:36 p.m.', '2:56 p.m.', '3:19 p.m.', '3:44 p.m.', '4:04 p.m.', '4:24 p.m.', '4:44 p.m.', '5:04 p.m.', '5:24 p.m.', '5:44 p.m.', '6:04 p.m.', '6:24 p.m.', '6:44 p.m.', '7:04 p.m.', '7:24 p.m.', '7:44 p.m.', '8:03 p.m.', '8:18 p.m.', '8:33 p.m.', '8:53 p.m.', '9:13 p.m.', '9:33 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B077%2FP77_IMG1.PNG?alt=media&token=a0fc1d16-4963-4ab2-aa55-55f1297f47df' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B077%2FP77_IMG2.PNG?alt=media&token=2debf033-82f6-4f45-814b-972d33a6402c' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B077%2FP77_IMG3.PNG?alt=media&token=55ea9d25-5b7b-44cc-b01a-6083d4394179' }
          ]
        },
        {
          numParada: '78',
          nameParada: 'Cll. 8 X Cra. 11b',
          coordinates: {
            latitude: 4.451857,
            longitude: -75.241156
          },
          horariosParada: ['5:34 a.m.', '5:54 a.m.', '6:14 a.m.', '6:34 a.m.', '6:54 a.m.', '7:18 a.m.', '7:44 a.m.', '8:04 a.m.', '8:24 a.m.', '8:44 a.m.', '9:04 a.m.', '9:24 a.m.', '9:44 a.m.', '10:03 a.m.', '10:20 a.m.', '10:37 a.m.', '10:57 a.m.', '11:17 a.m.', '11:37 a.m.', '11:57 a.m.', '12:17 a.m.', '12:37 p.m.', '12:57 p.m.', '1:17 p.m.', '1:37 p.m.', '1:57 p.m.', '2:17 p.m.', '2:37 p.m.', '2:57 p.m.', '3:20 p.m.', '3:44 p.m.', '4:04 p.m.', '4:24 p.m.', '4:44 p.m.', '5:04 p.m.', '5:24 p.m.', '5:44 p.m.', '6:04 p.m.', '6:24 p.m.', '6:44 p.m.', '7:04 p.m.', '7:24 p.m.', '7:44 p.m.', '8:03 p.m.', '8:19 p.m.', '8:34 p.m.', '8:54 p.m.', '9:14 p.m.', '9:34 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B078%2FP78_IMG1.PNG?alt=media&token=76dcb82a-5ce4-419c-b82f-24877483ad63' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B078%2FP78_IMG2.PNG?alt=media&token=99ad2013-2ac1-4b1a-a7ea-ae3260871143' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B078%2FP78_IMG3.PNG?alt=media&token=0ca7ba30-bad4-4590-a138-370c9cb267cf' }
          ]
        },
        {
          numParada: '79',
          nameParada: 'Cll. 4 X Cra. 11',
          coordinates: {
            latitude: 4.452697,
            longitude: -75.244761
          },
          horariosParada: ['5:35 a.m.', '5:55 a.m.', '6:15 a.m.', '6:35 a.m.', '6:55 a.m.', '7:20 a.m.', '7:46 a.m.', '8:06 a.m.', '8:26 a.m.', '8:46 a.m.', '9:06 a.m.', '9:26 a.m.', '9:46 a.m.', '10:05 a.m.', '10:22 a.m.', '10:38 a.m.', '10:58 a.m.', '11:18 a.m.', '11:38 a.m.', '11:58 a.m.', '12:18 a.m.', '12:38 p.m.', '12:58 p.m.', '1:18 p.m.', '1:38 p.m.', '1:58 p.m.', '2:18 p.m.', '2:38 p.m.', '2:58 p.m.', '3:22 p.m.', '3:46 p.m.', '4:06 p.m.', '4:26 p.m.', '4:46 p.m.', '5:06 p.m.', '5:26 p.m.', '5:46 p.m.', '6:06 p.m.', '6:26 p.m.', '6:46 p.m.', '7:06 p.m.', '7:26 p.m.', '7:46 p.m.', '8:04 p.m.', '8:20 p.m.', '8:35 p.m.', '8:55 p.m.', '9:15 p.m.', '9:35 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B079%2FP79_IMG1.PNG?alt=media&token=d2622ff9-8767-433b-ad94-0fb518f6f115' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B079%2FP79_IMG2.PNG?alt=media&token=ab45ec0e-fcc3-4b33-8c5d-4c04b3f69b95' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B079%2FP79_IMG3.PNG?alt=media&token=d4adabe0-bddc-4fce-bd9a-d38f841388ec' }
          ]
        },
        {
          numParada: '80',
          nameParada: 'Cra. 8 X Cll. 3',
          coordinates: {
            latitude: 4.452440,
            longitude: -75.245507
          },
          horariosParada: ['5:35 a.m.', '5:55 a.m.', '6:15 a.m.', '6:35 a.m.', '6:55 a.m.', '7:20 a.m.', '7:46 a.m.', '8:06 a.m.', '8:26 a.m.', '8:46 a.m.', '9:06 a.m.', '9:26 a.m.', '9:46 a.m.', '10:05 a.m.', '10:22 a.m.', '10:38 a.m.', '10:58 a.m.', '11:18 a.m.', '11:38 a.m.', '11:58 a.m.', '12:18 a.m.', '12:38 p.m.', '12:58 p.m.', '1:18 p.m.', '1:38 p.m.', '1:58 p.m.', '2:18 p.m.', '2:38 p.m.', '2:58 p.m.', '3:22 p.m.', '3:46 p.m.', '4:06 p.m.', '4:26 p.m.', '4:46 p.m.', '5:06 p.m.', '5:26 p.m.', '5:46 p.m.', '6:06 p.m.', '6:26 p.m.', '6:46 p.m.', '7:06 p.m.', '7:26 p.m.', '7:46 p.m.', '8:04 p.m.', '8:20 p.m.', '8:35 p.m.', '8:55 p.m.', '9:15 p.m.', '9:35 p.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B080%2FP80_IMG1.PNG?alt=media&token=042c22b7-b744-4777-8f5b-577027c0092d' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B080%2FP80_IMG2.PNG?alt=media&token=00654ddf-7934-4488-b937-bededb60102d' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/busetasSITSA%2FDelicias%20%E2%87%84%20Bel%C3%A9n%2FParada%20N%C2%B080%2FP80_IMG3.PNG?alt=media&token=cae0a4ef-81d0-4251-90c0-94f4da4ad1a0' }
          ]
        }
      ],
      polylineCoordinates: [
        { latitude: 4.462328, longitude: -75.202384 },
        { latitude: 4.461099, longitude: -75.201953 },
        { latitude: 4.461306, longitude: -75.201215 },
        { latitude: 4.459194, longitude: -75.200549 },
        { latitude: 4.458955, longitude: -75.200428 },
        { latitude: 4.458586, longitude: -75.200343 },
        { latitude: 4.458006, longitude: -75.200564 },
        { latitude: 4.457682, longitude: -75.200862 },
        { latitude: 4.457052, longitude: -75.201037 },
        { latitude: 4.456077, longitude: -75.201615 },
        { latitude: 4.455766, longitude: -75.201822 },
        { latitude: 4.455337, longitude: -75.202358 },
        { latitude: 4.454390, longitude: -75.202007 },
        { latitude: 4.453670, longitude: -75.201646 },
        { latitude: 4.451952, longitude: -75.200565 },
        { latitude: 4.451040, longitude: -75.202549 },
        { latitude: 4.450540, longitude: -75.202242 },
        { latitude: 4.449770, longitude: -75.201923 },
        { latitude: 4.448861, longitude: -75.201547 },
        { latitude: 4.447942, longitude: -75.201206 },
        { latitude: 4.447667, longitude: -75.202341 },
        { latitude: 4.447570, longitude: -75.202808 },
        { latitude: 4.447743, longitude: -75.203604 },
        { latitude: 4.447586, longitude: -75.204141 },
        { latitude: 4.447412, longitude: -75.204265 },
        { latitude: 4.447343, longitude: -75.205300 },
        { latitude: 4.446949, longitude: -75.206755 },
        { latitude: 4.446506, longitude: -75.206626 },
        { latitude: 4.446484, longitude: -75.205242 },
        { latitude: 4.447068, longitude: -75.202932 },
        { latitude: 4.447487, longitude: -75.201949 },
        { latitude: 4.447804, longitude: -75.201112 },
        { latitude: 4.447680, longitude: -75.200185 },
        { latitude: 4.447667, longitude: -75.199017 },
        { latitude: 4.447759, longitude: -75.198523 },
        { latitude: 4.447484, longitude: -75.198329 },
        { latitude: 4.447651, longitude: -75.197936 },
        { latitude: 4.447786, longitude: -75.197873 },
        { latitude: 4.447703, longitude: -75.197257 },
        { latitude: 4.447635, longitude: -75.195922 },
        { latitude: 4.447257, longitude: -75.194375 },
        { latitude: 4.446715, longitude: -75.191916 },
        { latitude: 4.446618, longitude: -75.191456 },
        { latitude: 4.446521, longitude: -75.190729 },
        { latitude: 4.445133, longitude: -75.191108 },
        { latitude: 4.444915, longitude: -75.191131 },
        { latitude: 4.444348, longitude: -75.191684 },
        { latitude: 4.443057, longitude: -75.191917 },
        { latitude: 4.442145, longitude: -75.191963 },
        { latitude: 4.442421, longitude: -75.195718 },
        { latitude: 4.442267, longitude: -75.198827 },
        { latitude: 4.442099, longitude: -75.199432 },
        { latitude: 4.443148, longitude: -75.199582 },
        { latitude: 4.443989, longitude: -75.200268 },
        { latitude: 4.443390, longitude: -75.201144 },
        { latitude: 4.444291, longitude: -75.201975 },
        { latitude: 4.443694, longitude: -75.202731 },
        { latitude: 4.440199, longitude: -75.201663 },
        { latitude: 4.436711, longitude: -75.200509 },
        { latitude: 4.436501, longitude: -75.201051 },
        { latitude: 4.435414, longitude: -75.204470 },
        { latitude: 4.434655, longitude: -75.205126 },
        { latitude: 4.433542, longitude: -75.205588 },
        { latitude: 4.433162, longitude: -75.206748 },
        { latitude: 4.432176, longitude: -75.208942 },
        { latitude: 4.431699, longitude: -75.209687 },
        { latitude: 4.432059, longitude: -75.210684 },
        { latitude: 4.432838, longitude: -75.211239 },
        { latitude: 4.433391, longitude: -75.212030 },
        { latitude: 4.433862, longitude: -75.212649 },
        { latitude: 4.434128, longitude: -75.213214 },
        { latitude: 4.432691, longitude: -75.214218 },
        { latitude: 4.432068, longitude: -75.214320 },
        { latitude: 4.430795, longitude: -75.213999 },
        { latitude: 4.430720, longitude: -75.214620 },
        { latitude: 4.430465, longitude: -75.215653 },
        { latitude: 4.430236, longitude: -75.216802 },
        { latitude: 4.430421, longitude: -75.217025 },
        { latitude: 4.431171, longitude: -75.217746 },
        { latitude: 4.431128, longitude: -75.218867 },
        { latitude: 4.431456, longitude: -75.220481 },
        { latitude: 4.431686, longitude: -75.220470 },
        { latitude: 4.432698, longitude: -75.220642 },
        { latitude: 4.433105, longitude: -75.221216 },
        { latitude: 4.433773, longitude: -75.222167 },
        { latitude: 4.434339, longitude: -75.222939 },
        { latitude: 4.434723, longitude: -75.223469 },
        { latitude: 4.435069, longitude: -75.223948 },
        { latitude: 4.435658, longitude: -75.224755 },
        { latitude: 4.436085, longitude: -75.225368 },
        { latitude: 4.436526, longitude: -75.225896 },
        { latitude: 4.436910, longitude: -75.226698 },
        { latitude: 4.436948, longitude: -75.227698 },
        { latitude: 4.437042, longitude: -75.228558 },
        { latitude: 4.437069, longitude: -75.229537 },
        { latitude: 4.437146, longitude: -75.230823 },
        { latitude: 4.437218, longitude: -75.232460 },
        { latitude: 4.437775, longitude: -75.233570 },
        { latitude: 4.437834, longitude: -75.233926 },
        { latitude: 4.437906, longitude: -75.234811 },
        { latitude: 4.437726, longitude: -75.235203 },
        { latitude: 4.437383, longitude: -75.235781 },
        { latitude: 4.437428, longitude: -75.236282 },
        { latitude: 4.437735, longitude: -75.236583 },
        { latitude: 4.438073, longitude: -75.237073 },
        { latitude: 4.438480, longitude: -75.237512 },
        { latitude: 4.439388, longitude: -75.238260 },
        { latitude: 4.439628, longitude: -75.238459 },
        { latitude: 4.440174, longitude: -75.238845 },
        { latitude: 4.440686, longitude: -75.239386 },
        { latitude: 4.441489, longitude: -75.238660 },
        { latitude: 4.442521, longitude: -75.237841 },
        { latitude: 4.443427, longitude: -75.237171 },
        { latitude: 4.444386, longitude: -75.236568 },
        { latitude: 4.446204, longitude: -75.235674 },
        { latitude: 4.446373, longitude: -75.235821 },
        { latitude: 4.447438, longitude: -75.238502 },
        { latitude: 4.447436, longitude: -75.239584 },
        { latitude: 4.447950, longitude: -75.240745 },
        { latitude: 4.450935, longitude: -75.239985 },
        { latitude: 4.451001, longitude: -75.239784 },
        { latitude: 4.450974, longitude: -75.239110 },
        { latitude: 4.452076, longitude: -75.239615 },
        { latitude: 4.452527, longitude: -75.240110 },
        { latitude: 4.452066, longitude: -75.240709 },
        { latitude: 4.452013, longitude: -75.241013 },
        { latitude: 4.451857, longitude: -75.241156 },
        { latitude: 4.451699, longitude: -75.241214 },
        { latitude: 4.452315, longitude: -75.242959 },
        { latitude: 4.451744, longitude: -75.243481 },
        { latitude: 4.452697, longitude: -75.244761 },
        { latitude: 4.453022, longitude: -75.245330 },
        { latitude: 4.452440, longitude: -75.245507 }
      ]
    }
  ])
  const [rutasVeredales, setRutasVeredales] = useState([ // eslint-disable-line
    {
      nameRuta: 'Ibagué - Altamira',
      numRuta: '1',
      horarioServicio: '5:00 a.m. - 9:00 p.m.',
      paradasRuta: [
        {
          numParada: '1',
          nameParada: 'Cruce El Diamante',
          coordinates: {
            latitude: 4.376195,
            longitude: -75.351358
          },
          horariosParada: ['6:00 a.m.'],
          imgsParada: []
        },
        {
          numParada: '2',
          nameParada: 'Dantas13',
          coordinates: {
            latitude: 4.379147,
            longitude: -75.350318
          },
          horariosParada: ['6:01 a.m.'],
          imgsParada: []
        },
        {
          numParada: '3',
          nameParada: 'Dantas10',
          coordinates: {
            latitude: 4.380341,
            longitude: -75.343685
          },
          horariosParada: ['6:03 a.m.'],
          imgsParada: []
        },
        {
          numParada: '4',
          nameParada: 'Dantas7',
          coordinates: {
            latitude: 4.381597,
            longitude: -75.336594
          },
          horariosParada: ['6:05 a.m.'],
          imgsParada: []
        },
        {
          numParada: '5',
          nameParada: 'Dantas6',
          coordinates: {
            latitude: 4.381735,
            longitude: -75.332609
          },
          horariosParada: ['6:07 a.m.'],
          imgsParada: []
        },
        {
          numParada: '6',
          nameParada: 'Dantas5',
          coordinates: {
            latitude: 4.381918,
            longitude: -75.328382
          },
          horariosParada: ['6:08 a.m.'],
          imgsParada: []
        },
        {
          numParada: '7',
          nameParada: 'Dantas4',
          coordinates: {
            latitude: 4.386585,
            longitude: -75.324934
          },
          horariosParada: ['6:10 a.m.'],
          imgsParada: []
        },
        {
          numParada: '8',
          nameParada: 'Dantas3',
          coordinates: {
            latitude: 4.387824,
            longitude: -75.321295
          },
          horariosParada: ['6:12 a.m.'],
          imgsParada: []
        },
        {
          numParada: '9',
          nameParada: 'Dantas2',
          coordinates: {
            latitude: 4.390918,
            longitude: -75.315376
          },
          horariosParada: ['6:14 a.m.'],
          imgsParada: []
        },
        {
          numParada: '10',
          nameParada: 'Dantas8',
          coordinates: {
            latitude: 4.395107,
            longitude: -75.307204
          },
          horariosParada: ['6:15 a.m.'],
          imgsParada: []
        },
        {
          numParada: '11',
          nameParada: 'Dantas1',
          coordinates: {
            latitude: 4.397965,
            longitude: -75.298375
          },
          horariosParada: ['6:17 a.m.'],
          imgsParada: []
        },
        {
          numParada: '12',
          nameParada: 'Cruce La Loma',
          coordinates: {
            latitude: 4.400156,
            longitude: -75.296332
          },
          horariosParada: ['6:19 a.m.'],
          imgsParada: []
        },
        {
          numParada: '13',
          nameParada: 'Coello Cocora',
          coordinates: {
            latitude: 4.400343,
            longitude: -75.291238
          },
          horariosParada: ['6:21 a.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B013%2FP13_IMG1.PNG?alt=media&token=6b659f0f-5ac3-4d3c-8f82-7936884d5d14' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B013%2FP13_IMG2.PNG?alt=media&token=f168e801-d6e9-4945-a9de-da18fdc3b523' }
          ]
        },
        {
          numParada: '14',
          nameParada: 'Variante Ibagué - Armenia',
          coordinates: {
            latitude: 4.403489,
            longitude: -75.281949
          },
          horariosParada: ['6:22 a.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B014%2FP14_IMG1.PNG?alt=media&token=6825f766-ec60-43b0-8135-cd1530e6dd08' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B014%2FP14_IMG2.PNG?alt=media&token=621f6482-ef2f-4c5c-8630-7b657e7841f5' }
          ]
        },
        {
          numParada: '15',
          nameParada: 'Ibagué - Armenia 3',
          coordinates: {
            latitude: 4.405566,
            longitude: -75.279425
          },
          horariosParada: ['6:24 a.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B015%2FP15_IMG1.PNG?alt=media&token=0ad3b1c5-cba8-44ec-bfc7-8cf08cce2494' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B015%2FP15_IMG2.PNG?alt=media&token=a0f337f8-bc4b-4361-8e4f-ab26682eddbf' }
          ]
        },
        {
          numParada: '16',
          nameParada: 'Ibagué - Armenia 2',
          coordinates: {
            latitude: 4.408263,
            longitude: -75.276176
          },
          horariosParada: ['6:26 a.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B016%2FP16_IMG1.PNG?alt=media&token=d3cfde30-91bf-4487-8060-ecc0230bbde2' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B016%2FP16_IMG2.PNG?alt=media&token=41ae39b5-5ee7-4633-b494-ddc2a92cf71a' }
          ]
        },
        {
          numParada: '17',
          nameParada: 'Variante Ibagué - Armenia 1',
          coordinates: {
            latitude: 4.410883,
            longitude: -75.270928
          },
          horariosParada: ['6:28 a.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B017%2FP17_IMG1.PNG?alt=media&token=1f3f2056-148f-4f74-819c-d3937c6a2ffa' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B017%2FP17_IMG2.PNG?alt=media&token=5cfecf8d-27cd-46b4-9f2a-b292146afcb2' }
          ]
        },
        {
          numParada: '18',
          nameParada: 'Av. Ricaurte X Cra. 38',
          coordinates: {
            latitude: 4.413464,
            longitude: -75.265053
          },
          horariosParada: ['6:29 a.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B018%2FP18_IMG1.PNG?alt=media&token=cb90fb47-9cc8-48d4-8303-ca950111126f' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B018%2FP18_IMG2.PNG?alt=media&token=fcce36a2-1f06-4510-a9d2-384162412053' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B018%2FP18_IMG3.PNG?alt=media&token=750a53e4-5376-403c-b5d9-1de6d3088120' }
          ]
        },
        {
          numParada: '19',
          nameParada: 'Av. Ricaurte X Cra. 36a',
          coordinates: {
            latitude: 4.415278,
            longitude: -75.262622
          },
          horariosParada: ['6:31 a.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B019%2FP19_IMG1.PNG?alt=media&token=0eca2eaa-b34d-4442-9f54-0153452b5924' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B019%2FP19_IMG2.PNG?alt=media&token=7a99207b-4c77-40cc-87d6-cab547cbc179' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B019%2FP19_IMG3.PNG?alt=media&token=25507030-479b-4cc4-9cc9-1c98b190ae65' }
          ]
        },
        {
          numParada: '20',
          nameParada: 'Cll. 20 X Cra. 27s',
          coordinates: {
            latitude: 4.419808,
            longitude: -75.255956
          },
          horariosParada: ['6:33 a.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B020%2FP20_IMG1.PNG?alt=media&token=e8a55ff1-a61b-4127-a39a-93cad9b1205a' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B020%2FP20_IMG2.PNG?alt=media&token=a63f08dd-318d-4eed-b579-fc63719bc686' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B020%2FP20_IMG3.PNG?alt=media&token=2ea77916-e724-43fc-9da2-a37a8d849f59' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B020%2FP20_IMG4.PNG?alt=media&token=822f4038-c303-4032-8475-39b5f2b9f637' }
          ]
        },
        {
          numParada: '21',
          nameParada: 'Cll. 20 X Cra. 29s',
          coordinates: {
            latitude: 4.422236,
            longitude: -75.254011
          },
          horariosParada: ['6:35 a.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B021%2FP21_IMG1.PNG?alt=media&token=f791e7ff-07e0-44dd-a06c-1818c573e6cf' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B021%2FP21_IMG2.PNG?alt=media&token=52172014-8923-4b08-809e-57ed8bb64bb9' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B021%2FP21_IMG3.PNG?alt=media&token=b80b2fbd-ebd7-4456-a6ca-538304896005' }
          ]
        },
        {
          numParada: '22',
          nameParada: 'Cll. 20 X Cra. 20s',
          coordinates: {
            latitude: 4.424809,
            longitude: -75.251680
          },
          horariosParada: ['6:36 a.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B022%2FP22_IMG1.PNG?alt=media&token=cc5b6097-7696-4596-a296-040cdcca2622' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B022%2FP22_IMG2.PNG?alt=media&token=78e105b6-b83a-4470-ac70-63e4b989dfb2' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B022%2FP22_IMG3.PNG?alt=media&token=c89b2156-69e4-47b7-ad1f-8e4aa20f2969' }
          ]
        },
        {
          numParada: '23',
          nameParada: 'Cll. 20 X Cra. 18s',
          coordinates: {
            latitude: 4.426809,
            longitude: -75.249025
          },
          horariosParada: ['6:38 a.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B023%2FP23_IMG1.PNG?alt=media&token=eb46678d-a17c-4925-983b-335fb81e81f3' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B023%2FP23_IMG2.PNG?alt=media&token=5f6e4f43-7053-47ea-ab5f-361d1db2353d' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B023%2FP23_IMG3.PNG?alt=media&token=e2251fe6-8222-4408-a3ba-9359eb06c294' }
          ]
        },
        {
          numParada: '24',
          nameParada: 'Cll. 20',
          coordinates: {
            latitude: 4.429376,
            longitude: -75.246113
          },
          horariosParada: ['6:40 a.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B024%2FP24_IMG1.PNG?alt=media&token=4e56c6b7-2af3-42f4-87eb-d97dd8352cb4' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B024%2FP24_IMG2.PNG?alt=media&token=19fc2810-f4c6-442a-b78f-ba594774d13f' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B024%2FP24_IMG3.PNG?alt=media&token=080267cc-0fda-457f-9748-58982067b8ef' }
          ]
        },
        {
          numParada: '25',
          nameParada: 'Mercacentro #8',
          coordinates: {
            latitude: 4.431940,
            longitude: -75.243959
          },
          horariosParada: ['6:42 a.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B025%2FP25_IMG1.PNG?alt=media&token=23b7d304-0976-4ea9-8ffc-b8fbe4afbfb3' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B025%2FP25_IMG2.PNG?alt=media&token=e4b69afc-4dc4-4980-898a-d4828e8399b8' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B025%2FP25_IMG3.PNG?alt=media&token=c0a1efb7-6ecb-4873-9149-e3fd408bacbe' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B025%2FP25_IMG4.PNG?alt=media&token=52f30958-581b-42c3-9e4b-0de7592b296a' }
          ]
        },
        {
          numParada: '26',
          nameParada: 'Ricaurte (Av. Ricaurte X Cra. 11 Sur)',
          coordinates: {
            latitude: 4.432893,
            longitude: -75.243420
          },
          horariosParada: ['6:43 a.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B026%2FP26_IMG1.PNG?alt=media&token=6bfcd892-baba-48d2-b49f-d78049cd7778' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B026%2FP26_IMG2.PNG?alt=media&token=9749a1d1-b4ec-449d-8868-ce3998dce0b2' }
          ]
        },
        {
          numParada: '27',
          nameParada: 'Av. Ricaurte X Cll. 15',
          coordinates: {
            latitude: 4.435595,
            longitude: -75.242806
          },
          horariosParada: ['6:45 a.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B027%2FP27_IMG1.PNG?alt=media&token=b6ae9536-ecd3-4388-b844-22993d79a7bb' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B027%2FP27_IMG2.PNG?alt=media&token=1af4037f-07d4-4bfe-a812-f66d00ca96f4' }
          ]
        },
        {
          numParada: '28',
          nameParada: 'Cra. 4 Sur',
          coordinates: {
            latitude: 4.437289,
            longitude: -75.242577
          },
          horariosParada: ['6:47 a.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B028%2FP28_IMG1.PNG?alt=media&token=4e309e07-89d8-4609-8262-20474adc51ea' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B028%2FP28_IMG2.PNG?alt=media&token=151cfb44-eb23-49e5-b732-ed257e003b67' }
          ]
        },
        {
          numParada: '29',
          nameParada: 'Cra. 2 Sur',
          coordinates: {
            latitude: 4.440296,
            longitude: -75.242933
          },
          horariosParada: ['6:49 a.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B029%2FP29_IMG1.PNG?alt=media&token=a9f18cf1-0021-48c9-b238-6618b11e7fbb' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B029%2FP29_IMG2.PNG?alt=media&token=5f5365b9-aa19-4076-997d-5d6047c50ad4' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B029%2FP29_IMG3.PNG?alt=media&token=eaef7749-4a64-4486-98d8-72a1644c4580' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B029%2FP29_IMG4.PNG?alt=media&token=72c92df6-9fb0-4ab3-a392-3c5d722ee7b0' }
          ]
        },
        {
          numParada: '30',
          nameParada: 'Carrera 2 Sur Pp',
          coordinates: {
            latitude: 4.439531,
            longitude: -75.241920
          },
          horariosParada: ['6:50 a.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B030%2FP30_IMG1.PNG?alt=media&token=f142624c-0f41-4438-a411-1d003fb45e99' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B030%2FP30_IMG2.PNG?alt=media&token=1b54bb2c-42dc-4f48-a5b9-ed3b10f051bf' }
          ]
        },
        {
          numParada: '31',
          nameParada: 'Cra. 2 X Cll. 15',
          coordinates: {
            latitude: 4.439146,
            longitude: -75.241062
          },
          horariosParada: ['6:52 a.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B031%2FP31_IMG1.PNG?alt=media&token=2972396a-61ac-4bc0-b3d9-2015c76d950a' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B031%2FP31_IMG2.PNG?alt=media&token=0a6ac968-f50e-4284-b831-ae4b98e8ed1b' }
          ]
        },
        {
          numParada: '32',
          nameParada: 'Carrera 2 Sur 15a39 Pp',
          coordinates: {
            latitude: 4.438490,
            longitude: -75.239760
          },
          horariosParada: ['6:54 a.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B032%2FP32_IMG1.PNG?alt=media&token=70d97d3a-b0dd-41fb-8012-73ac8eb95afc' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B032%2FP32_IMG2.PNG?alt=media&token=4d762e44-0c9d-4413-9c95-9bc51da4043c' }
          ]
        },
        {
          numParada: '33',
          nameParada: 'Carrera 2 Sur Pp',
          coordinates: {
            latitude: 4.437237,
            longitude: -75.237875
          },
          horariosParada: ['6:56 a.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B033%2FP33_IMG1.PNG?alt=media&token=bb9106c5-855a-4e51-822f-9cfd668e9156' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B033%2FP33_IMG2.PNG?alt=media&token=630a7386-640f-42e3-b5cc-bd7be6d45388' }
          ]
        },
        {
          numParada: '34',
          nameParada: 'Carrera 2 Sur Pp',
          coordinates: {
            latitude: 4.436297,
            longitude: -75.237445
          },
          horariosParada: ['6:57 a.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B034%2FP34_IMG1.PNG?alt=media&token=b8a4684f-9b00-4dc6-a7cb-73c4579b96c2' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B034%2FP34_IMG2.PNG?alt=media&token=db21d69c-58b1-4aa9-a64e-2d056fe41dd6' }
          ]
        },
        {
          numParada: '35',
          nameParada: 'Matallana (Cll. 20 X Trn. 1 Sur)',
          coordinates: {
            latitude: 4.436083,
            longitude: -75.236248
          },
          horariosParada: ['6:59 a.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B035%2FP35_IMG1.PNG?alt=media&token=d0c486f2-fa10-4163-bcbd-c66a79c998c0' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B035%2FP35_IMG2.PNG?alt=media&token=9dfece55-818a-43eb-82a0-a4c81fd288b9' }
          ]
        },
        {
          numParada: '36',
          nameParada: 'Cra. 20 X Cra. 1',
          coordinates: {
            latitude: 4.436487,
            longitude: -75.235836
          },
          horariosParada: ['7:01 a.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B036%2FP36_IMG1.PNG?alt=media&token=9b94ca5e-56a3-4fdd-ba07-5b1dc7be58a6' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B036%2FP36_IMG2.PNG?alt=media&token=0822e407-7cb9-474b-9519-ef64925c2356' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B036%2FP36_IMG3.PNG?alt=media&token=dbec696f-dbda-4429-853b-1bd6605701a0' }
          ]
        },
        {
          numParada: '37',
          nameParada: 'Terminal De Transporte (Cra. 1 X Cll. 20)',
          coordinates: {
            latitude: 4.437029,
            longitude: -75.235781
          },
          horariosParada: ['7:03 a.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B037%2FP37_IMG1.PNG?alt=media&token=a4c6140f-a841-45d4-bc6f-2046818dfa9a' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B037%2FP37_IMG2.PNG?alt=media&token=52b991d8-1772-4c4b-a766-18520b954bed' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B037%2FP37_IMG3.PNG?alt=media&token=9997e699-168d-4961-a560-576cfbf85bc6' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B037%2FP37_IMG4.PNG?alt=media&token=b452f9ab-28ba-42e6-96cf-a43395e97d97' }
          ]
        },
        {
          numParada: '38',
          nameParada: 'Cra. 1 X Cll. 18',
          coordinates: {
            latitude: 4.437854,
            longitude: -75.236982
          },
          horariosParada: ['7:04 a.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B038%2FP38_IMG1.PNG?alt=media&token=59ec36af-6448-43dd-ac22-5f248b03db4e' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B038%2FP38_IMG2.PNG?alt=media&token=9b4efdb4-e21c-4fd2-96b2-64862e2b767c' }
          ]
        },
        {
          numParada: '39',
          nameParada: 'Cra. 1 X Cll. 16',
          coordinates: {
            latitude: 4.439553,
            longitude: -75.238453
          },
          horariosParada: ['7:06 a.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B039%2FP39_IMG1.PNG?alt=media&token=09921ee5-b906-4efe-b686-77b47d83627c' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B039%2FP39_IMG2.PNG?alt=media&token=b63ee7b8-0439-49d7-9ff1-7a748d9579ee' }
          ]
        },
        {
          numParada: '40',
          nameParada: 'Carrera 1 1453 Pp',
          coordinates: {
            latitude: 4.441153,
            longitude: -75.239984
          },
          horariosParada: ['7:08 a.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B040%2FP40_IMG1.PNG?alt=media&token=32944509-b56a-426b-9005-8b1f1b03de93' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B040%2FP40_IMG2.PNG?alt=media&token=ae557901-8ab2-450a-a416-cf339f43dc7c' }
          ]
        },
        {
          numParada: '41',
          nameParada: 'Terminal Calle 13',
          coordinates: {
            latitude: 4.441558,
            longitude: -75.240837
          },
          horariosParada: ['7:10 a.m.'],
          imgsParada: [
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B041%2FP41_IMG1.PNG?alt=media&token=30ae9e7c-2216-4bc0-a97c-b017af643055' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B041%2FP41_IMG2.PNG?alt=media&token=7e47cc4a-a545-4da0-aa19-64af1a1226a9' },
            { url: 'https://firebasestorage.googleapis.com/v0/b/mobus-346916.appspot.com/o/rutasVeredales%2FIbagu%C3%A9%20-%20Altamira%2FParada%20N%C2%B041%2FP41_IMG3.PNG?alt=media&token=2e7814e7-9759-4319-9491-1fe08fae4870' }
          ]
        }
      ],
      polylineCoordinates: [
        { latitude: 4.376195, longitude: -75.351358 },
        { latitude: 4.376591, longitude: -75.351294 },
        { latitude: 4.376922, longitude: -75.351004 },
        { latitude: 4.377318, longitude: -75.350672 },
        { latitude: 4.377575, longitude: -75.350382 },
        { latitude: 4.378441, longitude: -75.350275 },
        { latitude: 4.378805, longitude: -75.350564 },
        { latitude: 4.379147, longitude: -75.350318 },
        { latitude: 4.379522, longitude: -75.350350 },
        { latitude: 4.379565, longitude: -75.350232 },
        { latitude: 4.379073, longitude: -75.349768 },
        { latitude: 4.378990, longitude: -75.349482 },
        { latitude: 4.378735, longitude: -75.349398 },
        { latitude: 4.378663, longitude: -75.348658 },
        { latitude: 4.378834, longitude: -75.348486 },
        { latitude: 4.378824, longitude: -75.348054 },
        { latitude: 4.378133, longitude: -75.346756 },
        { latitude: 4.378600, longitude: -75.346381 },
        { latitude: 4.378974, longitude: -75.346230 },
        { latitude: 4.379245, longitude: -75.345839 },
        { latitude: 4.379293, longitude: -75.345219 },
        { latitude: 4.379432, longitude: -75.345075 },
        { latitude: 4.379865, longitude: -75.345187 },
        { latitude: 4.379940, longitude: -75.345048 },
        { latitude: 4.379892, longitude: -75.344334 },
        { latitude: 4.380031, longitude: -75.343830 },
        { latitude: 4.380619, longitude: -75.343492 },
        { latitude: 4.381681, longitude: -75.343948 },
        { latitude: 4.382558, longitude: -75.343705 },
        { latitude: 4.381948, longitude: -75.343291 },
        { latitude: 4.381630, longitude: -75.343259 },
        { latitude: 4.381210, longitude: -75.343016 },
        { latitude: 4.380504, longitude: -75.341683 },
        { latitude: 4.380854, longitude: -75.341032 },
        { latitude: 4.380904, longitude: -75.340579 },
        { latitude: 4.381057, longitude: -75.340388 },
        { latitude: 4.381191, longitude: -75.339769 },
        { latitude: 4.381623, longitude: -75.338984 },
        { latitude: 4.381774, longitude: -75.338831 },
        { latitude: 4.381780, longitude: -75.338461 },
        { latitude: 4.381869, longitude: -75.338264 },
        { latitude: 4.381734, longitude: -75.337538 },
        { latitude: 4.381635, longitude: -75.337366 },
        { latitude: 4.381597, longitude: -75.336594 },
        { latitude: 4.381495, longitude: -75.335975 },
        { latitude: 4.381673, longitude: -75.335082 },
        { latitude: 4.381616, longitude: -75.334501 },
        { latitude: 4.381769, longitude: -75.333768 },
        { latitude: 4.381883, longitude: -75.333627 },
        { latitude: 4.381769, longitude: -75.333217 },
        { latitude: 4.381850, longitude: -75.332878 },
        { latitude: 4.381735, longitude: -75.332609 },
        { latitude: 4.381665, longitude: -75.332368 },
        { latitude: 4.381797, longitude: -75.332197 },
        { latitude: 4.382211, longitude: -75.332290 },
        { latitude: 4.382328, longitude: -75.332207 },
        { latitude: 4.381540, longitude: -75.331342 },
        { latitude: 4.381651, longitude: -75.330925 },
        { latitude: 4.381707, longitude: -75.330256 },
        { latitude: 4.381940, longitude: -75.330081 },
        { latitude: 4.382267, longitude: -75.330146 },
        { latitude: 4.382513, longitude: -75.329808 },
        { latitude: 4.382172, longitude: -75.329709 },
        { latitude: 4.381568, longitude: -75.329390 },
        { latitude: 4.381450, longitude: -75.329272 },
        { latitude: 4.381244, longitude: -75.329138 },
        { latitude: 4.381250, longitude: -75.328964 },
        { latitude: 4.381918, longitude: -75.328382 },
        { latitude: 4.382157, longitude: -75.328218 },
        { latitude: 4.382740, longitude: -75.328070 },
        { latitude: 4.382946, longitude: -75.328064 },
        { latitude: 4.383394, longitude: -75.327647 },
        { latitude: 4.383463, longitude: -75.327283 },
        { latitude: 4.383699, longitude: -75.327056 },
        { latitude: 4.383797, longitude: -75.326734 },
        { latitude: 4.384170, longitude: -75.326482 },
        { latitude: 4.384599, longitude: -75.326009 },
        { latitude: 4.384733, longitude: -75.325805 },
        { latitude: 4.385423, longitude: -75.325906 },
        { latitude: 4.385991, longitude: -75.325635 },
        { latitude: 4.386585, longitude: -75.324934 },
        { latitude: 4.386695, longitude: -75.324686 },
        { latitude: 4.386948, longitude: -75.324487 },
        { latitude: 4.386904, longitude: -75.323824 },
        { latitude: 4.386844, longitude: -75.323267 },
        { latitude: 4.386904, longitude: -75.323002 },
        { latitude: 4.387576, longitude: -75.321671 },
        { latitude: 4.387659, longitude: -75.321428 },
        { latitude: 4.387824, longitude: -75.321295 },
        { latitude: 4.387873, longitude: -75.321003 },
        { latitude: 4.387642, longitude: -75.320749 },
        { latitude: 4.387697, longitude: -75.320633 },
        { latitude: 4.388160, longitude: -75.320522 },
        { latitude: 4.388380, longitude: -75.319932 },
        { latitude: 4.388820, longitude: -75.319540 },
        { latitude: 4.389299, longitude: -75.319241 },
        { latitude: 4.389971, longitude: -75.319076 },
        { latitude: 4.390087, longitude: -75.318949 },
        { latitude: 4.390109, longitude: -75.317635 },
        { latitude: 4.389960, longitude: -75.317093 },
        { latitude: 4.390009, longitude: -75.316795 },
        { latitude: 4.390516, longitude: -75.315741 },
        { latitude: 4.390676, longitude: -75.315647 },
        { latitude: 4.390918, longitude: -75.315376 },
        { latitude: 4.391391, longitude: -75.314808 },
        { latitude: 4.391452, longitude: -75.314620 },
        { latitude: 4.391826, longitude: -75.314051 },
        { latitude: 4.391793, longitude: -75.312919 },
        { latitude: 4.391821, longitude: -75.312787 },
        { latitude: 4.391595, longitude: -75.311831 },
        { latitude: 4.391523, longitude: -75.311561 },
        { latitude: 4.391590, longitude: -75.311296 },
        { latitude: 4.392801, longitude: -75.310076 },
        { latitude: 4.393142, longitude: -75.309833 },
        { latitude: 4.393313, longitude: -75.309485 },
        { latitude: 4.393687, longitude: -75.309043 },
        { latitude: 4.394364, longitude: -75.308430 },
        { latitude: 4.394364, longitude: -75.307740 },
        { latitude: 4.394871, longitude: -75.307491 },
        { latitude: 4.395107, longitude: -75.307204 },
        { latitude: 4.395174, longitude: -75.306763 },
        { latitude: 4.394898, longitude: -75.305874 },
        { latitude: 4.394981, longitude: -75.305653 },
        { latitude: 4.395328, longitude: -75.305316 },
        { latitude: 4.395630, longitude: -75.304769 },
        { latitude: 4.395944, longitude: -75.303599 },
        { latitude: 4.396605, longitude: -75.302594 },
        { latitude: 4.397084, longitude: -75.302075 },
        { latitude: 4.397199, longitude: -75.301837 },
        { latitude: 4.396809, longitude: -75.300976 },
        { latitude: 4.396781, longitude: -75.300628 },
        { latitude: 4.396654, longitude: -75.300197 },
        { latitude: 4.397034, longitude: -75.299452 },
        { latitude: 4.397111, longitude: -75.299181 },
        { latitude: 4.397524, longitude: -75.298889 },
        { latitude: 4.397965, longitude: -75.298375 },
        { latitude: 4.398058, longitude: -75.298033 },
        { latitude: 4.398014, longitude: -75.297464 },
        { latitude: 4.398086, longitude: -75.297155 },
        { latitude: 4.398691, longitude: -75.296691 },
        { latitude: 4.399517, longitude: -75.296647 },
        { latitude: 4.399776, longitude: -75.296625 },
        { latitude: 4.400156, longitude: -75.296332 },
        { latitude: 4.400475, longitude: -75.296073 },
        { latitude: 4.400552, longitude: -75.295752 },
        { latitude: 4.400426, longitude: -75.294748 },
        { latitude: 4.400585, longitude: -75.293991 },
        { latitude: 4.400536, longitude: -75.293196 },
        { latitude: 4.400794, longitude: -75.292492 },
        { latitude: 4.400930, longitude: -75.292055 },
        { latitude: 4.400343, longitude: -75.291238 },
        { latitude: 4.400316, longitude: -75.290001 },
        { latitude: 4.400181, longitude: -75.289210 },
        { latitude: 4.401522, longitude: -75.287507 },
        { latitude: 4.401724, longitude: -75.287047 },
        { latitude: 4.401913, longitude: -75.284763 },
        { latitude: 4.402641, longitude: -75.284046 },
        { latitude: 4.402741, longitude: -75.283718 },
        { latitude: 4.402572, longitude: -75.283029 },
        { latitude: 4.403489, longitude: -75.281949 },
        { latitude: 4.405099, longitude: -75.280247 },
        { latitude: 4.405566, longitude: -75.279425 },
        { latitude: 4.406252, longitude: -75.277810 },
        { latitude: 4.406510, longitude: -75.277820 },
        { latitude: 4.406576, longitude: -75.278001 },
        { latitude: 4.406443, longitude: -75.278278 },
        { latitude: 4.406653, longitude: -75.278498 },
        { latitude: 4.408158, longitude: -75.277542 },
        { latitude: 4.408197, longitude: -75.277246 },
        { latitude: 4.408025, longitude: -75.276873 },
        { latitude: 4.408263, longitude: -75.276176 },
        { latitude: 4.408120, longitude: -75.275134 },
        { latitude: 4.407453, longitude: -75.274589 },
        { latitude: 4.407659, longitude: -75.273846 },
        { latitude: 4.409465, longitude: -75.274096 },
        { latitude: 4.409802, longitude: -75.273751 },
        { latitude: 4.409987, longitude: -75.271888 },
        { latitude: 4.410351, longitude: -75.271733 },
        { latitude: 4.410688, longitude: -75.272348 },
        { latitude: 4.411045, longitude: -75.272402 },
        { latitude: 4.411301, longitude: -75.272071 },
        { latitude: 4.411247, longitude: -75.271219 },
        { latitude: 4.410883, longitude: -75.270928 },
        { latitude: 4.410567, longitude: -75.270151 },
        { latitude: 4.410264, longitude: -75.269921 },
        { latitude: 4.409819, longitude: -75.269915 },
        { latitude: 4.409630, longitude: -75.269813 },
        { latitude: 4.409664, longitude: -75.269523 },
        { latitude: 4.409960, longitude: -75.269191 },
        { latitude: 4.409879, longitude: -75.268901 },
        { latitude: 4.409138, longitude: -75.268705 },
        { latitude: 4.409003, longitude: -75.267975 },
        { latitude: 4.409487, longitude: -75.267385 },
        { latitude: 4.409760, longitude: -75.267442 },
        { latitude: 4.410068, longitude: -75.267835 },
        { latitude: 4.411109, longitude: -75.268073 },
        { latitude: 4.411687, longitude: -75.267737 },
        { latitude: 4.411849, longitude: -75.267276 },
        { latitude: 4.411721, longitude: -75.266552 },
        { latitude: 4.412391, longitude: -75.265663 },
        { latitude: 4.413464, longitude: -75.265053 },
        { latitude: 4.413660, longitude: -75.265053 },
        { latitude: 4.414034, longitude: -75.264749 },
        { latitude: 4.415278, longitude: -75.262622 },
        { latitude: 4.416260, longitude: -75.262211 },
        { latitude: 4.416584, longitude: -75.261876 },
        { latitude: 4.416736, longitude: -75.261026 },
        { latitude: 4.416003, longitude: -75.259707 },
        { latitude: 4.416565, longitude: -75.258904 },
        { latitude: 4.418776, longitude: -75.257269 },
        { latitude: 4.419808, longitude: -75.255956 },
        { latitude: 4.422236, longitude: -75.254011 },
        { latitude: 4.423807, longitude: -75.252870 },
        { latitude: 4.424809, longitude: -75.251680 },
        { latitude: 4.426809, longitude: -75.249025 },
        { latitude: 4.428255, longitude: -75.247192 },
        { latitude: 4.429376, longitude: -75.246113 },
        { latitude: 4.431940, longitude: -75.243959 },
        { latitude: 4.432893, longitude: -75.243420 },
        { latitude: 4.435595, longitude: -75.242806 },
        { latitude: 4.436485, longitude: -75.242481 },
        { latitude: 4.437289, longitude: -75.242577 },
        { latitude: 4.438130, longitude: -75.242821 },
        { latitude: 4.439344, longitude: -75.243631 },
        { latitude: 4.439601, longitude: -75.243556 },
        { latitude: 4.440296, longitude: -75.242933 },
        { latitude: 4.439531, longitude: -75.241920 },
        { latitude: 4.439146, longitude: -75.241062 },
        { latitude: 4.438875, longitude: -75.240326 },
        { latitude: 4.438490, longitude: -75.239760 },
        { latitude: 4.438062, longitude: -75.239305 },
        { latitude: 4.437737, longitude: -75.238448 },
        { latitude: 4.437237, longitude: -75.237875 },
        { latitude: 4.436625, longitude: -75.237769 },
        { latitude: 4.436297, longitude: -75.237445 },
        { latitude: 4.435849, longitude: -75.237046 },
        { latitude: 4.435776, longitude: -75.236570 },
        { latitude: 4.436083, longitude: -75.236248 },
        { latitude: 4.436487, longitude: -75.235836 },
        { latitude: 4.436819, longitude: -75.235726 },
        { latitude: 4.437029, longitude: -75.235781 },
        { latitude: 4.437854, longitude: -75.236982 },
        { latitude: 4.438081, longitude: -75.237284 },
        { latitude: 4.439553, longitude: -75.238453 },
        { latitude: 4.440660, longitude: -75.239353 },
        { latitude: 4.440915, longitude: -75.239587 },
        { latitude: 4.441153, longitude: -75.239984 },
        { latitude: 4.441558, longitude: -75.240837 }
      ]
    }
  ])
  const [rutas, setRutas] = useState([])
  const [principalColors, setPrincipalColors] = useState({})

  useEffect(() => {
    isSectionVereda
      ? GetBusetas({ firebaseKeyCollection: 'rutasVeredales', setRutas, setLoading })
      : GetBusetas({ firebaseKeyCollection: 'busetasSITSA', setRutas, setLoading })
  }, [])

  useEffect(() => {
    isSectionVereda
      ? setPrincipalColors(COLORS.secondColor)
      : setPrincipalColors(COLORS.firstColor)
  }, [])

  const saveBusetasIbague = () => { // eslint-disable-line
    busetas.forEach(async (buseta) => {
      await addDoc(collection(database, 'busetasSITSA'), buseta)
    })
  }

  const saveBusetasVeredales = () => { // eslint-disable-line
    rutasVeredales.forEach(async (buseta) => {
      await addDoc(collection(database, 'rutasVeredales'), buseta)
    })
  }

  return (
    <View>
      {
        rutas.map((ruta) => (
          <TouchableOpacity
            key={ruta.id}
            onPress={() => {
              if (isViewResetHistory) {
                setIsViewResetHistory(false)
              } else {
                navigation.navigate('BusetaInfo', { ruta, principalColors })
                setRutaSelected(ruta)
              }
            }}
          >
            <ItemBusetas
              nameRuta={ruta.nameRuta}
              numRuta={!isSectionVereda ? ruta.numRuta : null}
              principalColors={principalColors}
            />
          </TouchableOpacity>
        ))
      }
      {/* <TouchableOpacity
        onPress={() => saveBusetasIbague()}
      >
        <Text>AGREGARRRRRRRRRR</Text>
      </TouchableOpacity> */}
    </View>
  )
}