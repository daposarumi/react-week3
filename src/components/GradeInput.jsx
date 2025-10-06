import React from "react";

class GradeInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: "", score: "", loading: false, message: "" };
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        if (!this.state.name || !this.state.score) return;

        this.setState({ loading: true, message: "" });
        await this.props.onAdd(this.state.name, parseInt(this.state.score)); // handled in App.jsx
        this.setState({ name: "", score: "", loading: false, message: "Student added successfully!" });
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
                    <button type="submit" disabled={this.state.loading}>
                        {this.state.loading ? "Adding..." : "Add"}
                    </button>
                </form>
                {this.state.message && <p style={{ color: "green" }}>{this.state.message}</p>}
            </>
        );
    }
}


export default GradeInput;