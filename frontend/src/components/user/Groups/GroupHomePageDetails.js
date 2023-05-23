import React from 'react'

const GroupHomePageDetails = ({group}) => {
  return (
    <div className="col-md-6 flex-grow-1 ms-2">
    <div className="card h-100">
        <div className="card-body hstack gap-5 mx-2 align-items-baseline">
            <div className="d-flex flex-column col-sm-6">
                <h4>Group description</h4>
                <p className="text-muted ">
                    Group Description : 
                     {" "+ group.description}
                </p>

                <p className="text-muted">
                    Group tags{" :"}
                    <span>
                        
                        {group.tags[0]}
                    </span>
                </p>
                <p className="text-muted">
                    Group admin{" :"} <i> {group.owner.name} </i>
                </p>
            </div>
            <div className="d-flex flex-column col-sm-6">
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