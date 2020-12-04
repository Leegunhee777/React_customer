import * as React from 'react';

import './ImageSlide.scss';

import { Popup } from '@app/components/AppPartial';


// str[Math.round(Math.random() * str.length) - 1]


/**
 * TIP
 * Animation을 적용할때 여러가지 방법중 2가지 방법 비교해보기
 */


class ImageSlide extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: 2,
            timer: null,
            changeTimer: null,
            onLoading: false,
            chooseImgId: ''
        }

        this.sliderDiv = null;
        this.imagesRef = [];
        this.searchImageWidth = 0;
        this.allImageWidth = 0;

        this.moveRight = this.moveRight.bind(this);
        this.openImage = this.openImage.bind(this);
        this.onStartAnimation = this.onStartAnimation.bind(this);
        this.onRestartAnimation = this.onRestartAnimation.bind(this);
    }

    componentDidMount() {
        this.onStartAnimation();
    }

    componentWillUpdate() {
        this.imagesRef = [];
    }

    componentWillUnmount() {
        clearInterval(timer);
        clearTimeout(changeTimer);
        this.state({ timer: null, changeTimer: null});
    }

    render() {
        this.searchImageWidth = this.props.imageRef.getBoundingClientRect().width / 3;
        this.allImageWidth = this.props.imageRef.getBoundingClientRect().width / 5;
        return (
            <div className='app-imageSlide'>
                <div className='image_slider-title'>
                    <span className='slider-title-name'>
                        {this.props.title}
                    </span>
                </div>
                <div id={this.props.type} className={`image_slider-table ${
                            this.props.type === 'search'
                            ? 'search-animation'
                            : 'all-animation'
                        }`
                    }
                    ref={(ref) => {
                        this.sliderDiv = ref;
                    }}
                    style={{
                        overflow: 'hidden',
                        width: this.props.type === 'search'
                            ? this.searchImageWidth * this.props.data.length
                            : this.allImageWidth * this.props.data.length,
                        height: '80%',
                        transform: `translate3d(0, 0, 0)`
                    }}
                >
                    {
                        this.props.data.map((data) => {
                            return (
                                <div
                                    className='image_slider-img-content'
                                    key={Math.round(Math.random() * 10000)}
                                    style={{
                                        width: this.props.type === 'search'
                                        ? this.searchImageWidth
                                        : this.allImageWidth,
                                        height: '100%',
                                        float: 'left',
                                        position: 'relative'
                                    }}
                                    ref={(ref) => {
                                        if (this.props.type === 'search' && isNaN(ref)) {
                                            this.imagesRef = this.imagesRef.concat(ref);
                                        }
                                    }}
                                >
                                    <img
                                        src={data.src[0]}
                                        data-id={data.id}
                                        style={{ width: '100%', height: '100%'}}
                                        onClick={this.openImage}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
                {
                    this.state.onLoading
                    ? <Popup data={this.state.chooseImgId} onRestartAnimation={this.onRestartAnimation}/>
                    : null
                }
            </div>
        );
    }

    moveRight() { //이게 서치바에서 animal이나 fruit을 입력했을때 뜨는 이미지슬라이드 부분 애니메이션 ,이놈은 자바스크립트를 이용하는놈
        this.sliderDiv.animate({
            transform: ['translate3d(0,0,0', `translate3d(-${this.searchImageWidth}px, 0, 0)`]
        }, {
            duration: 1000
        });
        this.state.changeTimer = setTimeout(() => {
            this.sliderDiv.appendChild(this.imagesRef[0]);
            const temp = this.imagesRef[0];
            this.imagesRef.splice(0, 1);
            this.imagesRef = this.imagesRef.concat(temp);
        }, 1000);
    };

    openImage(e) {
        if (e.currentTarget.getAttribute('data-id') !== '') {
            clearInterval(this.state.timer);
            clearTimeout(this.state.changeTimer);
            this.setState({ onLoading: true, timer: null, changeTimer: null, chooseImgId: e.currentTarget.getAttribute('data-id') });
        }
    }

    onRestartAnimation() {
        this.setState({ onLoading: false, chooseImgId: ''});
        this.onStartAnimation();
    }

    onStartAnimation() {
        if (this.imagesRef.length > 0) {
            this.state.timer = setInterval(() => {
                this.moveRight();
            }, this.state.time * 1000);
        }
    }

}

export default ImageSlide;
