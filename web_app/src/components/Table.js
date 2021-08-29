import React from 'react';
import _ from 'lodash';

class Table extends React.Component {

    renderFilas(){
        return _.map(this.props.data,(item, index) => {
            console.log(item)
            return (<tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.item_description}</td>
                    <td>{item.count}</td>
                    <td>{item.merchant_address}</td>
                    <td>{item.merchant_name}</td>
                    </tr>
            )
        });
    }

    totalCount(){
        var count = 0

        for (var i=0; i<this.props.data.length; i++) {
            count += this.props.data[i].count
        }

        return count
    }

    render () {
        if (this.props.data.length >0) {
            return(
                <div>
                    <table className ="ui celled table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Item Description</th>
                            <th>Count</th>
                            <th>Merchan Address</th>
                            <th>Merchant Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderFilas()}
                    </tbody>
                    </table>
                    <h3 className="ui header">Total count: {this.totalCount()}</h3>
                </div>
            )
        } else {
            return <div></div>
        }
    }
}

export default Table;