import React from 'react';
import db_connection from '../api/db_connection';
import Table from  './Table';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data : []};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileInput = React.createRef();
    }

    handleSubmit(event) {
        event.preventDefault();
        var fr=new FileReader();
        fr.onload = async function () {
                    const response = await db_connection.get('/insert',{
                        params:{data: fr.result }
                });
        };
        fr.readAsText(this.fileInput.current.files[0]);
        setTimeout(this.updateData(), 3000);
    }

    updateData = async () => {
        const response = await db_connection.get('/read',{});
        console.log(response.data)
        this.setState({
            data: response.data,
        });
    };

    render() {
        return (
                <div className="ui container">
                    <h1>Load data to Relational Database</h1>
                    <form onSubmit={this.handleSubmit} className="ui form">
                        <div className="field">
                            <label>Upload .txt file:</label>
                            <input type="file" ref={this.fileInput} />
                        </div>
                        <br />
                        <button type="submit" className="ui button">Submit</button>
                    </form>
                    <br />
                    <Table data={this.state.data}/>
                </div>
        );

    }
  }

export default App;