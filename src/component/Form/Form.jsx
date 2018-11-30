import React ,{Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './Form.css'

class Form extends Component {
    constructor() {
        super()
        
        this.state = {
            inputName: '',
            inputPrice: '',
            inputIMG: '',
            currentProduct: {},
            edit: false,
        }
    }

    getProduct = () => {
        if (this.props.match.params.id) {
            axios.get(`/api/product/${this.props.match.params.id}`)
                .then(res => {
                    this.setState({currentProduct: res.data[0], 
                                    edit: true,
                                    inputName: res.data[0].name,
                                    inputPrice: res.data[0].price,
                                    inputIMG: res.data[0].image_url})
                })
        }
    }

    componentDidMount = () => {
        this.getProduct()
    }

    componentDidUpdate = () => {
        if(this.state.edit && !/\/admin\//gi.test(this.props.match.path))
        this.setState({ inputName: "",
                        inputPrice: "",
                        inputIMG: "",
                        edit: false,})
    }

    handleInput = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }
    
    resetInput = () => {
        this.setState({edit: false})
    }

    postInventory = () => {
        let body = {
            name: this.state.inputName ? this.state.inputName : "",
            price: this.state.inputPrice ? this.state.inputPrice : 0,
            image_url: this.state.inputIMG ? this.state.inputIMG: "",
        }
        axios.post('/api/product', body)
            .then(res => {
                console.log(0)
                this.props.getInventory()
                console.log(1)
                this.resetInput()
            }).catch(error => {
                console.log(`${error}`)
            })
    }

    putCurrentProduct = () => {
        let body = {
            name: this.state.inputName ? this.state.inputName : "",
            price: this.state.inputPrice ? this.state.inputPrice : 0,
            image_url: this.state.inputIMG ? this.state.inputIMG: "",
            product_id: this.state.currentProduct.product_id,
        }
        axios.put("/api/product", body)
            .then(() => {
                this.resetInput()
            }).catch(error => {
                console.log(`(Form-putCurrentProduct)${error}`)
            })
    }

    render() {
        return (
            <div className="form">
                <img 
                    src={this.state.inputIMG ? this.state.inputIMG : 'https://res.cloudinary.com/teepublic/image/private/s--8m16XX_f--/t_Preview/b_rgb:eae0c7,c_lpad,f_jpg,h_630,q_90,w_1200/v1448216743/production/designs/17956_3.jpg'}
                    alt="its a product" 
                    className='form-img-display'/>
                <input 
                    value={this.state.inputName}
                    name="inputName"
                    className="form-name" 
                    placeholder='Name'
                    onChange={this.handleInput}/>
                <input 
                    value={this.state.inputPrice}
                    className="form-price" 
                    name="inputPrice" 
                    placeholder='Price'
                    onChange={this.handleInput}/>
                <input 
                    value={this.state.inputIMG}
                    className="form-img"
                    name="inputIMG" 
                    placeholder='Image URL'
                    onChange={this.handleInput}/>
                <div className="form-buttons">
                    <Link to='/admin'>
                        <button 
                            className="form-button">
                            Cancel
                        </button>
                    </Link>
                    {this.state.edit 
                    ?   <Link to="/">
                            <button className="form-button" onClick={this.putCurrentProduct}>
                                Save Changes
                            </button>
                        </Link>
                    :   <Link to='/'>
                            <button
                                onClick={this.postInventory}
                                className="form-button">
                                Add to Inventory
                            </button>
                        </Link>
                    
                    }
                </div>
            </div>
        )
    }
}

export default Form;