import Taro, { Component } from '@tarojs/taro'
import { View, Swiper, SwiperItem } from '@tarojs/components'
import { Header } from './header/header'
import { connect } from '@tarojs/redux'
import { getPaperSum, addAnswer } from '@/actions/counter'
import { Question } from './question/question'
import './detail.scss'

@connect(
  ({ counter }) => ({
    counter,
  }),
  (dispatch) => ({
    onGetPaperSum(payload) {
      dispatch(getPaperSum(payload))
    },
    onAddAnswer(payload) {
      dispatch(addAnswer(payload))
    },
  })
)
class Detail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      paper: [],
      swiperHeight: [],
      current: 0,
    }
  }

  componentWillMount() {
    const paper = [
      {
        title: '为什么1',
        content: ['选择1', '选择2', '选择3', '选择4'],
        type: 1,
        id: 0,
      },
      {
        title: '为什么2',
        content: ['选择1', '选择2', '选择3', '选择4', '选择5'],
        type: 1,
        id: 1,
      },
      {
        title: '为什么3',
        content: ['选择1', '选择2', '选择3'],
        type: 1,
        id: 2,
      },
      {
        title: '为什么4',
        content: ['选择1', '选择2', '选择3', '选择4'],
        type: 1,
        id: 3,
      },
      {
        title: '为什么5',
        content: ['选择1', '选择2', '选择3', '选择4'],
        type: 1,
        id: 4,
      },
    ]
    this.setState({
      paper,
    })
    this.props.onGetPaperSum(paper)
  }

  getSwiperHeight = ({ index, height }) => {
    // console.log(index, height)
    const swiperHeight = this.state.swiperHeight
    swiperHeight[index] = height
    this.setState({
      swiperHeight,
    })
  }
  change = (e) => {
    const current = e.target.current
    if (current === this.state.current) return
    this.setState({
      current,
    })
  }
  changeAnswer = (id, value) => {
    const paper = this.state.paper.map(
      (item) => {
        if (item.id === id) {
          item.answer = value
        }
        return item
      }
      // item.id === id ? (item.anser = value && item) : item
    )
    this.setState(
      {
        paper,
      },
      () => {
        this.props.onGetPaperSum(paper)
      }
    )
  }

  render() {
    const swiperItem = this.state.paper.map((item, index) => (
      // (index < this.state.current + 2 && index > this.state.current - 2) &&
      <SwiperItem key={item.id} class="swiperItem">
        {index < this.state.current + 2 && index > this.state.current - 2 && (
          <Question
            index={index}
            questionId={item.id}
            title={item.title}
            answer={item.answer}
            checkboxOption={item.content}
            onSwitchHeight={this.getSwiperHeight}
            onChangeAnswer={this.changeAnswer}
          ></Question>
        )}
      </SwiperItem>
    ))
    return (
      <View class="page">
        <Header></Header>
        <View style="margin-top: 10px">
          <Swiper
            style={{
              height: this.state.swiperHeight[this.state.current] + 'px',
            }}
            onChange={this.change}
            current={this.state.current}
          >
            {swiperItem}
          </Swiper>
        </View>
      </View>
    )
  }
}

export default Detail