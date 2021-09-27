import React,{useEffect,useState} from 'react';
import {
	View,
	Text,
	Button,
	StyleSheet,
	ImageBackground,
	Image,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as firebase from 'firebase';
//import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

function HomeScreen({ navigation }) {
	return (
		<View style={{flex:1}}>
			<View style={{ flex: 0.3 }}>
				<ScrollView
					style={{ flex: 1 }}
					contentContainerStyle={{ height: 250, width: "200%" }}
				>
					<ImageBackground
						source={{ uri: "https://picsum.photos/200/300" }}
						style={styles.image}
					>
						<TouchableOpacity
							onPress={() =>
								navigation.navigate("Noticia", {
									titulo: "Um titulo",
									conteudo: "Minha notícia",
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
								A minha notícia
							</Text>
						</TouchableOpacity>
					</ImageBackground>

					<ImageBackground
						source={{ uri: "https://picsum.photos/200/300" }}
						style={styles.image}
					>
						<TouchableOpacity
							style={{
								width: "100%",
								height: "100%",
								backgroundColor: "rgba(0,0,0,.4)",
								justifyContent: "flex-end",
							}}
						>
							<Text style={{ fontSize: 29, color: "white" }}>
								A minha notícia
							</Text>
						</TouchableOpacity>
					</ImageBackground>
				</ScrollView>
			</View>

			<View style={{flex:0.7, padding:20}}>
							<View>
								<View style={{width:50, height:2, backgroundColor:'#069', position:'absolute', left:40, top:40}}></View>
								<Text>
									Mais noticías
								</Text>
								<ScrollView contentContainerStyle={{padding:20}} style={{flex:1}}>
									<View style={{flexDirection:'row', marginBottom:10}}>
										<TouchableOpacity style={{flexDirection:'row'}}>
											<Image source={{  uri: "https://picsum.photos/200/300" }} style={{width:100, height:100}}/>
											<Text style={{padding: 10}}>MInha noticia</Text>
										</TouchableOpacity>
									</View>
								</ScrollView>
							</View>
			</View>

		</View>
	);
}

function NoticiaScreen({ navigation ,route }) {
	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Text>{route.params.titulo}</Text>
			<Text>{route.params.conteudo}</Text>
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

export default App;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	image: {
		flex: 1,
		resizeMode: "cover",
		justifyContent: "flex-end",
		width: "50%",
	},
});
