import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import Form from './Form';
import { Card, Icon, Image, Grid } from 'semantic-ui-react'



class Dashboard extends React.Component {
  state = { products: [], showForm: false }

  componentDidMount() {
    axios.get('/api/products')
      .then( res => this.setState({ products: res.data }) )
  }


  form() {
    return <Form submit={this.submit}/>
  }

  submit = (product) => {
    let { products } = this.state;
    axios.post('/api/products', { product } )
      .then( res => this.setState({ products: [{...res.data}, ...products], showForm: false }) )
      .catch( e => console.log(e.response.data.errors) )
  }


  toggleForm = () => {
    this.setState( state => {
      return { showForm: !state.showForm }
    })
  }


    show() {
      let { products } = this.state;
      return (
        <div class="ui grid">
         { products.map( p =>
            <div key={p.id}>
              <br/>
                  <Card>
                <Image src="http://lorempixel.com/640/480/food/"/>
                <Card.Content>
                  <Card.Header>
                    <Link to={`/products/${p.id}`}>{p.name}</Link>
                  </Card.Header>
                  <Card.Description>
                    {p.price}
                  </Card.Description>
                </Card.Content>
              </Card>
              <br/>
            </div>
          )}
        </div>
        )}

  render() {
    let { showForm } = this.state;
    return (
      <div>
        <h2>Food Items</h2>
        <button onClick={this.toggleForm}>{ showForm ? 'Hide' : 'Show' } form</button>
        { showForm ? this.form() : this.show() }

      </div>


    )
  }
}


export default Dashboard;
