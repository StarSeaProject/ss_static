class Question extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        let page = 1;
        let ajaxOpt = {
            type: "post",
            url: "question/ajax",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: '{"questionStatus":"' + 0 + '","page":"' + page + '"}',
            async: false,
            success: (data) => {
                this.props.questionArr = data
            },
        };
        $.ajax(ajaxOpt);
    }
    render() {
        return (
            <div className="container">
                <QuestionOption />
                <QuestionTable data={this.props.questionArr} />
            </div>
        )
    }
}

class QuestionOption extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="row container form">
                <select id="questionStatus">
                    <option value="">请选择问题状态</option>
                    <option value="1">未回答</option>
                    <option value="2">已回答</option>
                </select>
                <button id="questionquery" className="btn btn-info btn-lg text-right">查询</button>
            </div>
        )
    }
}

class QuestionTable extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="row container">
                <table id="questions" className="table">
                    <thead>
                        <tr>
                        <th>问题内容</th>
                        <th>问题提出时间</th>
                        <th>问题状态</th>
                        <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.data.result.map((data, index) => {
                                return <QuestionTableThread data={data} />
                            })
                        }
                    </tbody>
                </table>
                <Page data={this.props.data} />
            </div>
        )
    }
}

class QuestionTableThread extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        var answer = prompt("请输入回复内容", "");
        if (answer === undefined || answer === "") {
            alert("请输入回复内容！");
            return false;
        }
        if (answer.length > 150) {
            alert("回复内容不能超过150！");
            return false;
        }
        let questionId = this.props.data.questionId
        if (questionId === undefined || questionId === "") {
            alert("问题id不能为空");
            return false;
        }
        $.ajax({
            type: "post",
            // data: '{"questionId":"' + questionId + '","answer":"' + answer + '"}',
            data:JSON.stringify({
                questionId,answer
            }),
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            url: "question/answer",
            success: function (data) {
                if (data.result == true) {
                    alert("回复成功!");
                    location.reload();
                }
                else {
                    alert("回复失败!");
                }
            }
        });
    }

    render() {
        return (
            <tr>
                <td>{this.props.data.question}</td>
                <td>{this.props.data.createTime}</td>
                <td className={this.props.data.questionId}>{this.props.data.questionStatus}</td>
                {
                    this.props.data.questionStatus == "未回答" &&
                    <td>
                        <button onClick={this.handleClick} className="answer btn btn-primary btn-lg text-right" id={this.props.data.questionId}>回答</button>
                    </td>
                }
            </tr>
        )
    }
}

class Page extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div id="pages" onClick={this.handleClick}>
                {
                    this.props.data.nowPage - 1 > 0 && <a href="javascript:void(0)">{this.props.nowPage - 1}</a>
                }
                <span>{this.props.nowPage}</span>
                {
                    this.props.data.nowPage + 1 <= this.props.totalPage && <a href="javascript:void(0)">{this.props.nowPage + 1}</a>
                }
            </div>
        )
    }
}