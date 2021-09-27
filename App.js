import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ImageBackground, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as firebase from "firebase";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { db } from "./firebase.js";

function HomeScreen({ navigation }) {
	const [noticias, setNoticias] = useState([]);

	useEffect(() => {
		db.collection("noticias")
			.orderBy("data", "desc")
			.onSnapshot((snapshot) => {
				setNoticias(
					snapshot.docs.map((doc) =>{
						return { info: doc.data()};
					})
				);
			});
	}, []);

	return (
		<View style={{ flex: 1 }}>
			<View style={{ flex: 0.3 }}>
				<ScrollView
          horizontal
					style={{ flex: 1 }}
					contentContainerStyle={{
						height: "100%",
						width: "200%",
						backgroundColor: "red",
					}}
				>
					{noticias.map((val, index) => {
						if (index < 2) {
							return (
								<ImageBackground
									source={{ uri: val.info.imagem }}
									style={styles.image}
								>
									<TouchableOpacity
										onPress={() =>
											navigation.navigate("Noticia", {
												titulo: val.info.titulo,
												conteudo: val.info.conteudo,
												imagem: val.info.imagem,
											})
										}
										style={{
											width: "100%",
											height: "100%",
											backgroundColor: "rgba(0,0,0,.4)",
											justifyContent: "flex-end",
										}}
									>
										<Text style={{ fontSize: 29, color: "white" }}>
											{val.info.titulo}
										</Text>
									</TouchableOpacity>
								</ImageBackground>
							);
						}
					})}
				</ScrollView>
			</View>

			<View style={{ flex: 0.7, padding: 20 }}>
				<View>
					<View
						style={{
							width: 50,
							height: 2,
							backgroundColor: "#069",
							position: "absolute",
							left: 40,
							top: 40,
						}}
					></View>
					<Text>Mais noticías</Text>
					<ScrollView
						contentContainerStyle={{ padding: 20 }}
						style={{ flex: 1 }}
					>
						{
              noticias.map((val,index)=> {
                if(index >= 2){
                  return (
										<View style={{ flexDirection: "row", marginBottom: 10 }}>
											<TouchableOpacity style={{ flexDirection: "row" }} onPress={()=>navigation.navigate('Noticia',{
                        titulo: val.info.titulo,
                        conteudo: val.info.conteudo,
                        imagem: val.info.imagem
                      })}>
												<Image
													source={{ uri: val.info.imagem }}
													style={{ width: 100, height: 100 }}
												/>
												<Text style={{ padding: 10 }}>{val.info.titulo}</Text>
											</TouchableOpacity>
										</View>
									);
                }
              })
							
						}
					</ScrollView>
				</View>
			</View>
		</View>
	);
}

function NoticiaScreen({ navigation, route }) {
	return (
		<View style={{ flex: 1 }}>
			<ScrollView style={{ flex: 1 }}>
				<ImageBackground
					style={styles.imageConteudo}
					source={{ uri: route.params.imagem }}
				>
					<View
						style={{
							width: "100%",
							height: "100%",
							backgroundColor: "rgba(0,0,0,0.5)",
							justifyContent: "flex-end",
							padding: 10,
						}}
					>
						<Text style={{ fontSize: 27, color: "white" }}>
							{route.params.titulo}
						</Text>
					</View>
				</ImageBackground>

				<View style={{ flex: 0.8 }}>
					<Text
						style={{
							fontSize: 15,
							padding: 20,
						}}
					>
						{route.params.conteudo}
					</Text>
				</View>
			</ScrollView>
		</View>
	);
}

const Stack = createStackNavigator();

function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Portal" component={HomeScreen} />
				<Stack.Screen name="Noticia" component={NoticiaScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}


const styles = StyleSheet.create({
	image: {
		flex: 1,
		resizeMode: "cover",
		justifyContent: "flex-end",
		width: "100%",
	},
	imageConteudo: {
		resizeMode: "cover",
		width: "100%",
		flex: 0.5,
		height: 200,
	},
});



export default App;