import React from 'react'

const GroupHomePageDetails = ({group}) => {
  return (
    <div className="col-md-6 flex-grow-1 ms-2">
    <div className="card h-100">
        <div className="card-body d-flex justify-content-around">
            <div className="d-flex flex-column">
                <h4>Group description</h4>
                <p className="text-muted">
                    Group Description{" "}
                    <i> {group.description} </i>
                </p>

                <p className="text-muted">
                    Group tags{" "}
                    <i>
                        {" "}
                        {group.tags.map((tag) => {
                            return `#${tag}`;
                        })}{" "}
                    </i>
                </p>
                <p className="text-muted">
                    Group admin <i> {group.owner.name} </i>
                </p>
            </div>
            <div className="d-flex flex-column">
                <h4 className="">Group rules</h4>
                <p>Be kind and courteous</p>
                <p>No hate speech or bullying</p>
                <p>No promotions or spam</p>
                <p>Respect everyone's privacy</p>
                <p>Respect everyone's opinions</p>
            </div>
        </div>
    </div>
</div>
  )
}

export default GroupHomePageDetails