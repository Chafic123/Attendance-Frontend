export default function StudentNotificationCenter(){
    return(
        <div id="notification-center"
        style={{
            width: '100%',
            height: '80%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div>
                <p style={{
                     opacity: 0.46,
                     fontSize: '38.08px', 
                     fontWeight: 700,
                }}>No Notifications</p>
            </div>
        </div>
    )
}