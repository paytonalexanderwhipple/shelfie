import React ,{Component} from 'react';
import './Dashboard.css'
import Product from '../Product/Product.jsx';
import axios from 'axios';

class Dashboard extends Component {
    constructor() {
        super()

        this.state = {
            inventory: [],
        }
    }

    componentDidMount = () => {
        this.getInventory()
      }

    getInventory = () => {
        axios.get('/api/inventory')
          .then(res => {
            this.setState({inventory: res.data})
          }).catch(error => {
            console.log(`(dashboard-getInventory)${error}`)
          })
      }
    

    deleteProduct = (id) => {
        axios.delete(`/api/product/${id}`)
            .then(() => {
                this.getInventory()
            }).catch(error => {
                console.log(`(Dashboard-deleteProduct)${error}`)
            })
    }
    
    render() {

        let products = this.state.inventory.map((product, i) => {
            return (
                    <Product 
                        key={i} 
                        product={product} 
                        deleteProduct={this.deleteProduct}/>
                    )
        })

        return (
            <div className='dashboard'>
                {products}
            </div>
        )
    }
}

export default Dashboard;