import React from 'react';
import Performance from '../Performance/Performance';
import SiteInfo from '../SiteInfo/SiteInfo';


const Profile = ({open}) => {
  return (
    <div>
        <Performance />
        {/* <NewNotebook /> */}
        <SiteInfo open={open} />
    </div>
  )
}

export default Profile