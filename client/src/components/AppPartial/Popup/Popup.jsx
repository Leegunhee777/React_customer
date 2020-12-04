import * as React from 'react';

// Stylesheet
import './Popup.scss';
import { searchDataWithId } from '../../../utils/search/search';

class Popup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: '',
            timer: ''
        }
        this.imagesRef = [];

        this.getSearchDataWithId = this.getSearchDataWithId.bind(this);
        this.closePopUp = this.closePopUp.bind(this);
        this.startAnimation = this.startAnimation.bind(this);
    }

    componentDidMount() {
        this.getSearchDataWithId();
        this.startAnimation();
    }

    render() {
        if (this.state.data === '') {
            return <div></div>
        }

        let i = 0;

        return (
            <div className='app-popup'>
                <div className='popup-background' onClick={this.closePopUp}></div>
                <div className='popup-content'>
                    <div className='popup-title'>
                        <span>{this.state.data.name}</span>
                    </div>
                    <div className='popup-image-slider'>
                        {
                            this.state.data.src.map((data) => {
                                return (
                                    <img
                                        className='popup-image'
                                        ref= {(ref) => {
                                            if (isNaN(ref)) {
                                                this.imagesRef = this.imagesRef.concat(ref);
                                            }
                                        }}
                                        style={{
                                            transform: `translateX(${i++ * 100 === 0 ? 0 : 100}%)`,
                                            opacity: 1
                                        }}
                                        key={Math.round(Math.random() * 10000)}
                                        src={data}
                                    />
                                );
                            })
                        }
                    </div>
                    <div className='popup-desc'>
                        <p>{this.state.data.desc}</p>
                    </div>
                </div>
            </div>
        );
    }

    async getSearchDataWithId() {
        const data = await searchDataWithId(this.props.data);
        if (data.length > 0) {
            this.setState({ data: data[0] });
        }
    }

    closePopUp() {
        this.props.onRestartAnimation();
    }

    startAnimation() { //팝업창에 있는 애니메이션 (즉 , 기린 사진 4장 계속 도는거임),이놈도 그냥 자바스크립트이용하는놈
        let index = 0;
        this.setState({ timer: setInterval(() => {
            if (this.imagesRef.length > 1) {
                for (let i = 0; i < 2; i++) {
                    if ((index + i) === this.imagesRef.length) {
                        index = -1;
                    }
                    const image = this.imagesRef[index + i];
                    const imageWidth = image.style.transform.replace('translateX(', '').replace('%)', '');
                    image.style.transform = `translateX(${imageWidth - 100}%)`;
                    image.style.opacity = 1;
                }
                index++;

                setTimeout(() => {
                    this.imagesRef.map((image) => {
                        const imageWidth = image.style.transform.replace('translateX(', '').replace('%)', '');
                        if (imageWidth === '-100') {
                            image.style.transform = `translateX(100%)`;
                            image.style.opacity = 0;
                        }
                    });
                }, 1000);
            }
        }, 3000)});
    }
}

export default Popup;
