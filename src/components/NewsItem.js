import React, { Component } from 'react'

export class NewsItem extends Component {



    render() {
        let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
        return (
            <div className='my-3'>
                <div className="card">

                    {/* // for stylepurpose */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        position: 'absolute',
                        right: '0',
                        backgroundColor: '#4f4f4b',
                        borderRadius: '20px'
                    }}>
                        <span className="badge rounded-pill bg-transparent">
                            {source}
                        </span>
                    </div>


                    <img src={imageUrl ? imageUrl : "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/1200px-A_black_image.jpg?20201103073518"}
                        className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className='card-text'><small className='text-muted'>By {author ? author : "Unknown"} on {new Date(date).toGMTString()}</small></p>
                        <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-transparent btn-sm">Read more..</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem