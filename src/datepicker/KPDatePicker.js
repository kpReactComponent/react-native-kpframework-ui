import React from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  DatePickerAndroid,
  TimePickerAndroid,
  DatePickerIOS,
  Platform,
  Animated,
  Keyboard,
  StyleSheet,
} from "react-native";
import Style from "./style";
import Moment from "moment";

const FORMATS = {
  date: "YYYY-MM-DD",
  datetime: "YYYY-MM-DD HH:mm",
  time: "HH:mm",
};

const SUPPORTED_ORIENTATIONS = [
  "portrait",
  "portrait-upside-down",
  "landscape",
  "landscape-left",
  "landscape-right",
];

export default class KPDatePicker extends React.PureComponent {
  static propTypes = {
    mode: PropTypes.oneOf(["date", "datetime", "time"]),
    androidMode: PropTypes.oneOf(["clock", "calendar", "spinner", "default"]),
    date: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
      PropTypes.object,
    ]),
    format: PropTypes.string,
    minDate: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ]),
    maxDate: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ]),
    height: PropTypes.number,
    duration: PropTypes.number,
    confirmBtnText: PropTypes.string,
    cancelBtnText: PropTypes.string,
    iOSCustomStyles: PropTypes.object,
    onDateChange: PropTypes.func,
    onOpenModal: PropTypes.func,
    onCloseModal: PropTypes.func,
    onPressMask: PropTypes.func,
    is24Hour: PropTypes.bool,
    getDateStr: PropTypes.func,
    locale: PropTypes.string,
    iOSTitle: PropTypes.string,
  };

  static defaultProps = {
    mode: "date",
    androidMode: "default",
    date: "",
    // component height: 216(DatePickerIOS) + 1(borderTop) + 42(marginTop), IOS only
    height: 259,

    // slide animation duration time, default to 300ms, IOS only
    duration: 0.3,
    confirmBtnText: "确定",
    cancelBtnText: "取消",
    iOSCustomStyles: {},
    iOSTitle: "请选择",
  };

  constructor(props) {
    super(props);

    this.state = {
      date: this.getDate(),
      modalVisible: false,
      animatedHeight: new Animated.Value(0),
      animatedFade: new Animated.Value(0),
      allowPointerEvents: true,
    };

    this.getDate = this.getDate.bind(this);
    this.getDateStr = this.getDateStr.bind(this);
    this.datePicked = this.datePicked.bind(this);
    this.onPressDate = this.onPressDate.bind(this);
    this.onPressCancel = this.onPressCancel.bind(this);
    this.onPressConfirm = this.onPressConfirm.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onPressMask = this.onPressMask.bind(this);
    this.onDatePicked = this.onDatePicked.bind(this);
    this.onTimePicked = this.onTimePicked.bind(this);
    this.onDatetimePicked = this.onDatetimePicked.bind(this);
    this.onDatetimeTimePicked = this.onDatetimeTimePicked.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.date !== this.props.date) {
      this.setState({ date: this.getDate(nextProps.date) });
    }
  }

  setModalVisible(visible) {
    const { height, duration } = this.props;

    // slide animation
    if (visible) {
      this.setState({ modalVisible: visible });
      const transAnim = Animated.timing(this.state.animatedHeight, {
        toValue: height,
        duration: duration * 1000,
      });
      const fadeAnim = Animated.timing(this.state.animatedFade, {
        toValue: 1,
        duration: duration * 1000,
      });
      return Animated.parallel([transAnim, fadeAnim]).start();
    } else {
      const transAnim = Animated.timing(this.state.animatedHeight, {
        toValue: 0,
        duration: duration * 1000,
      });
      const fadeAnim = Animated.timing(this.state.animatedFade, {
        toValue: 0,
        duration: duration * 1000,
      });
      return Animated.parallel([transAnim, fadeAnim]).start(() => {
        this.setState({ modalVisible: visible });
      });
    }
  }

  onStartShouldSetResponder(e) {
    return true;
  }

  onMoveShouldSetResponder(e) {
    return true;
  }

  onPressMask() {
    if (typeof this.props.onPressMask === "function") {
      this.props.onPressMask();
    } else {
      this.onPressCancel();
    }
  }

  onPressCancel() {
    this.setModalVisible(false);

    if (typeof this.props.onCloseModal === "function") {
      this.props.onCloseModal();
    }
  }

  onPressConfirm() {
    this.datePicked();
    this.setModalVisible(false);

    if (typeof this.props.onCloseModal === "function") {
      this.props.onCloseModal();
    }
  }

  getDate(date = this.props.date) {
    const { mode, minDate, maxDate, format = FORMATS[mode] } = this.props;

    // date默认值
    if (!date) {
      let now = new Date();
      if (minDate) {
        let _minDate = this.getDate(minDate);

        if (now < _minDate) {
          return _minDate;
        }
      }

      if (maxDate) {
        let _maxDate = this.getDate(maxDate);

        if (now > _maxDate) {
          return _maxDate;
        }
      }

      return now;
    }

    if (date instanceof Date) {
      return date;
    }

    return Moment(date, format).toDate();
  }

  getDateStr(date = this.props.date) {
    const { mode, format = FORMATS[mode] } = this.props;

    const dateInstance = date instanceof Date ? date : this.getDate(date);

    if (typeof this.props.getDateStr === "function") {
      return this.props.getDateStr(dateInstance);
    }

    return Moment(dateInstance).format(format);
  }

  datePicked() {
    if (typeof this.props.onDateChange === "function") {
      this.props.onDateChange(
        this.getDateStr(this.state.date),
        this.state.date
      );
    }
  }

  onDateChange(date) {
    this.setState({
      allowPointerEvents: false,
      date: date,
    });
    const timeoutId = setTimeout(() => {
      this.setState({
        allowPointerEvents: true,
      });
      clearTimeout(timeoutId);
    }, 200);
  }

  onDatePicked({ action, year, month, day }) {
    if (action !== DatePickerAndroid.dismissedAction) {
      this.setState({
        date: new Date(year, month, day),
      });
      this.datePicked();
    } else {
      this.onPressCancel();
    }
  }

  onTimePicked({ action, hour, minute }) {
    if (action !== DatePickerAndroid.dismissedAction) {
      this.setState({
        date: Moment().hour(hour).minute(minute).toDate(),
      });
      this.datePicked();
    } else {
      this.onPressCancel();
    }
  }

  onDatetimePicked({ action, year, month, day }) {
    const {
      mode,
      androidMode,
      format = FORMATS[mode],
      is24Hour = !format.match(/h|a/),
    } = this.props;

    if (action !== DatePickerAndroid.dismissedAction) {
      let timeMoment = Moment(this.state.date);

      TimePickerAndroid.open({
        hour: timeMoment.hour(),
        minute: timeMoment.minutes(),
        is24Hour: is24Hour,
        mode: androidMode,
      }).then(this.onDatetimeTimePicked.bind(this, year, month, day));
    } else {
      this.onPressCancel();
    }
  }

  onDatetimeTimePicked(year, month, day, { action, hour, minute }) {
    if (action !== DatePickerAndroid.dismissedAction) {
      this.setState({
        date: new Date(year, month, day, hour, minute),
      });
      this.datePicked();
    } else {
      this.onPressCancel();
    }
  }

  onPressDate() {
    if (this.props.disabled) {
      return true;
    }

    Keyboard.dismiss();

    // reset state
    this.setState({
      date: this.getDate(),
    });

    if (Platform.OS === "ios") {
      this.setModalVisible(true);
    } else {
      const {
        mode,
        androidMode,
        format = FORMATS[mode],
        minDate,
        maxDate,
        is24Hour = !format.match(/h|a/),
      } = this.props;

      // 选日期
      if (mode === "date") {
        DatePickerAndroid.open({
          date: this.state.date,
          minDate: minDate && this.getDate(minDate),
          maxDate: maxDate && this.getDate(maxDate),
          mode: androidMode,
        }).then(this.onDatePicked);
      } else if (mode === "time") {
        // 选时间

        let timeMoment = Moment(this.state.date);

        TimePickerAndroid.open({
          hour: timeMoment.hour(),
          minute: timeMoment.minutes(),
          is24Hour: is24Hour,
          mode: androidMode,
        }).then(this.onTimePicked);
      } else if (mode === "datetime") {
        // 选日期和时间

        DatePickerAndroid.open({
          date: this.state.date,
          minDate: minDate && this.getDate(minDate),
          maxDate: maxDate && this.getDate(maxDate),
          mode: androidMode,
        }).then(this.onDatetimePicked);
      }
    }

    if (typeof this.props.onOpenModal === "function") {
      this.props.onOpenModal();
    }
  }

  render() {
    const {
      mode,
      style,
      iOSCustomStyles,
      minDate,
      maxDate,
      minuteInterval,
      timeZoneOffsetInMinutes,
      cancelBtnText,
      confirmBtnText,
      locale,
      children,
      iOSTitle,
      ...restProps
    } = this.props;

    return (
      <TouchableOpacity
        style={[style && style]}
        onPress={this.onPressDate}
        activeOpacity={0.8}
        {...restProps}
      >
        {children}
        {Platform.OS === "ios" && (
          <Modal
            transparent={true}
            animationType="none"
            visible={this.state.modalVisible}
            supportedOrientations={SUPPORTED_ORIENTATIONS}
            onRequestClose={() => {
              this.setModalVisible(false);
            }}
          >
            <Animated.View
              style={[
                Style.datePickerMask,
                { opacity: this.state.animatedFade },
              ]}
            >
              <TouchableOpacity
                style={[StyleSheet.absoluteFill, { alignItems: "flex-end" }]}
                activeOpacity={1}
                onPress={this.onPressMask}
              >
                <View
                  style={{
                    flex: 1,
                    width: "100%",
                    justifyContent: "flex-end",
                  }}
                >
                  <Animated.View
                    style={[
                      Style.datePickerCon,
                      {
                        height: this.state.animatedHeight,
                      },
                      iOSCustomStyles.datePickerCon,
                    ]}
                  >
                    <View
                      pointerEvents={
                        this.state.allowPointerEvents ? "auto" : "none"
                      }
                    >
                      <DatePickerIOS
                        date={this.state.date}
                        mode={mode}
                        minimumDate={minDate && this.getDate(minDate)}
                        maximumDate={maxDate && this.getDate(maxDate)}
                        onDateChange={this.onDateChange}
                        minuteInterval={minuteInterval}
                        timeZoneOffsetInMinutes={
                          timeZoneOffsetInMinutes
                            ? timeZoneOffsetInMinutes
                            : null
                        }
                        style={[Style.datePicker, iOSCustomStyles.datePicker]}
                        locale={locale}
                      />
                    </View>
                    <View style={Style.toolbar} pointerEvents="box-none">
                      <TouchableOpacity
                        onPress={this.onPressCancel}
                        style={[Style.btnText, iOSCustomStyles.btnCancel]}
                        activeOpacity={0.8}
                      >
                        <Text
                          style={[
                            Style.btnTextText,
                            Style.btnTextCancel,
                            iOSCustomStyles.btnTextCancel,
                          ]}
                        >
                          {cancelBtnText}
                        </Text>
                      </TouchableOpacity>
                      <Text
                        style={[Style.tooltitle, iOSCustomStyles.toolTitle]}
                      >
                        {iOSTitle}
                      </Text>
                      <TouchableOpacity
                        onPress={this.onPressConfirm}
                        style={[Style.btnText, iOSCustomStyles.btnConfirm]}
                        activeOpacity={0.8}
                      >
                        <Text
                          style={[
                            Style.btnTextText,
                            iOSCustomStyles.btnTextConfirm,
                          ]}
                        >
                          {confirmBtnText}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </Animated.View>
                </View>
              </TouchableOpacity>
            </Animated.View>
          </Modal>
        )}
      </TouchableOpacity>
    );
  }
}
