import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../../globals/colors";

const Pin = ({ route }) => {
  const navigation = useNavigation();
  const [pinArray, setPinArray] = useState([]);
  const [firstFilled, setFirstFilled] = useState(false);
  const [secondFilled, setSecondFilled] = useState(false);
  const [thirdFilled, setThirdFilled] = useState(false);
  const [fourthFilled, setFourthFilled] = useState(false);
  const [count, setCount] = useState(0);
  const [pinError, setPinError] = useState(false);

  const PIN = pinArray.join("");

  const signUp = () => {
    if (pinArray.length === 4) {
      //pin logic
      //   console.log('Pin', PIN);
      navigation.navigate("Confirmpin", { fPIN: PIN });
    }
  };

  const pushToArray = (value) => {
    if (value !== "00") {
      if (pinArray.length >= 0 && pinArray.length <= 3) {
        setCount(count + 1);
        if (count === 0) {
          setFirstFilled(true);
        } else if (count === 1) {
          setSecondFilled(true);
        } else if (count === 2) {
          setThirdFilled(true);
        } else if (count === 3) {
          setFourthFilled(true);
        }
        pinArray.push(value);
        console.log(pinArray);
      } else {
        console.log("Cant go past", pinArray.length);
      }
    } else {
      if (pinArray.length >= 1 && pinArray.length <= 4) {
        pinArray.pop();
        setPinError(false);
        setCount(count - 1);
        if (count === 1) {
          setFirstFilled(false);
        } else if (count === 2) {
          setSecondFilled(false);
        } else if (count === 3) {
          setThirdFilled(false);
        } else if (count === 4) {
          setFourthFilled(false);
        }
        console.log("Array after deletion", pinArray);
      } else {
        console.log("Cant go past", pinArray.length);
      }
    }
  };

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.topView}>
        <Text style={styles.pageTitle}>Register.</Text>
        <Text style={styles.pageDescription}>
          Enter a four-digit PIN to be used to access your account
        </Text>
      </View>
      {pinError ? (
        <View>
          <Text style={styles.errorText}>
            Enter a four digit PIN to continue
          </Text>
          <View style={styles.mainInputView}>
            {[...Array(4)].map((index) => {
              return (
                <View key={index} style={styles.outerCircle}>
                  <View key={index} style={styles.errorCircle}></View>
                </View>
              );
            })}
          </View>
        </View>
      ) : (
        <View style={styles.mainInputView}>
          <View style={styles.outerCircle}>
            <Text style={styles.inputNumber}>{pinArray[0]}</Text>
          </View>
          <View style={styles.outerCircle}>
            <Text style={styles.inputNumber}>{pinArray[1]}</Text>
          </View>
          <View style={styles.outerCircle}>
            <Text style={styles.inputNumber}>{pinArray[2]}</Text>
          </View>
          <View style={styles.outerCircle}>
            <Text style={styles.inputNumber}>{pinArray[3]}</Text>
          </View>
        </View>
      )}

      <View style={styles.keyBoardView}>
        <View style={styles.keyboardRowView}>
          <TouchableOpacity
            style={styles.keyButton}
            onPress={() => pushToArray("1")}>
            <Text style={styles.keyButtonText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.keyButton}
            onPress={() => pushToArray("2")}>
            <Text style={styles.keyButtonText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.keyButton}
            onPress={() => pushToArray("3")}>
            <Text style={styles.keyButtonText}>3</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.keyboardRowView}>
          <TouchableOpacity
            style={styles.keyButton}
            onPress={() => pushToArray("4")}>
            <Text style={styles.keyButtonText}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.keyButton}
            onPress={() => pushToArray("5")}>
            <Text style={styles.keyButtonText}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.keyButton}
            onPress={() => pushToArray("6")}>
            <Text style={styles.keyButtonText}>6</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.keyboardRowView}>
          <TouchableOpacity
            style={styles.keyButton}
            onPress={() => pushToArray("7")}>
            <Text style={styles.keyButtonText}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.keyButton}
            onPress={() => pushToArray("8")}>
            <Text style={styles.keyButtonText}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.keyButton}
            onPress={() => pushToArray("9")}>
            <Text style={styles.keyButtonText}>9</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.keyboardRowView}>
          <TouchableOpacity
            style={styles.keyButton}
            onPress={() => pushToArray("00")}>
            <Ionicons name="backspace-outline" size={25} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.keyButton}
            onPress={() => pushToArray("0")}>
            <Text style={styles.keyButtonText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.keyButton} onPress={signUp}>
            <Text style={styles.keyButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          height: 50,
        }}
      />
    </ScrollView>
  );
};

export default Pin;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topView: {
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingVertical: 50,
  },
  pageTitle: {
    fontWeight: "bold",
    fontSize: 30,
    color: colors.text,
  },
  pageDescription: {
    color: colors.text,
  },
  info: {
    color: colors.text,
    // width: Dimensions.get('window').width * 0.7,
    paddingTop: 20,
  },
  errorCircle: {
    height: 20,
    width: 20,
    backgroundColor: colors.red,
    borderRadius: 100,
    textAlign: "center",
    fontSize: 14,
  },
  inputCircle: {
    color: colors.text,
    textAlign: "center",
    height: 40,
    width: 40,
    fontSize: 14,
  },
  outerCircle: {
    height: 60,
    width: 60,
    borderWidth: 1,
    borderColor: colors.line,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  inputNumber: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "bold",
  },
  keyBoardView: {},
  keyboardRowView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 15,
  },
  keyButton: {
    borderBottomColor: colors.line,
    borderBottomWidth: 0.5,
    width: Dimensions.get("window").width * 0.15,
    height: Dimensions.get("window").width * 0.15,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  keyButtonText: {
    fontSize: 20,
    color: colors.text,
  },
  errorText: {
    fontSize: 10,
    textAlign: "center",
    color: colors.red,
  },
  mainInputView: {
    paddingVertical: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
