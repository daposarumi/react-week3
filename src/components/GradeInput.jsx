import React from "react";

class GradeInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: "", score: "" };
    }

    componentDidMount() {
        console.log("GradeInput mounted ✅");
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (!this.state.name || !this.state.score) return;
        this.props.onAdd(this.state.name, parseInt(this.state.score));
        this.setState({ name: "", score: "" });
    };

    render() {
        return (
            <>
                <h2>Add Student</h2>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={this.state.name}
                        onChange={(e) => this.setState({ name: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Score"
                        value={this.state.score}
                        onChange={(e) => this.setState({ score: e.target.value })}
                    />
                    <button type="submit">Add</button>
                </form>
            </>
        );
    }
}

export default GradeInput;
