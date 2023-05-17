import React from "react";
export function formatDateFromMongoDB(mongoDBDate) {
	const date = new Date(mongoDBDate);
	
	const day = date.getDate().toString().padStart(2, '0');
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const year = date.getFullYear().toString();
	const hours = date.getHours().toString().padStart(2, '0');
	const minutes = date.getMinutes().toString().padStart(2, '0');
	
	return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

const GroupNews = ({_new}) => {
	return (
		<>
			
			
				<div className="d-flex gap-3 ms-3">
						<img src={_new.user.avatar.url} className="img-fluid rounded" height="80" width="80" alt="news" />
					<div>
                        <h4>{_new.title}</h4>
						<h6>{_new.user.status}</h6>
                        <i className="text-muted">{formatDateFromMongoDB(_new.createdAt)}</i>
                        
						<p className="text-muted">
							{_new.description}
						</p>
					</div>
				</div>
                <hr />
               
		</>
	);
};

export default GroupNews;
