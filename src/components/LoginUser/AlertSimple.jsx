import React from 'react'
import AwesomeAlert from 'react-native-awesome-alerts'

/* ➡ Componente que se encarga de renderizar un mensaje de alerta simple que puede ser reutilizado en varios componentes con el titulo y mensaje que se adecuen al apartado de la aplicación. */
export default function AlertSimple ({ show, title, titleStyle, message, cancelText, onCancelPressed }) {
  return (
    <AwesomeAlert
      show={show}
      showProgress={false}
      title={title}
      titleStyle={titleStyle}
      message={message}
      closeOnTouchOutside={false}
      closeOnHardwareBackPress={false}
      showCancelButton
      cancelText={cancelText}
      cancelButtonTextStyle={{ fontWeight: 'bold' }}
      cancelButtonColor='#7900ac'
      cancelButtonStyle={{
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      onCancelPressed={onCancelPressed}
    />
  )
}
