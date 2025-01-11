export default function MainContentTop ( props ) {
    return (
        <div 
        style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        }}>
            <p 
            style={{
                fontSize: '36px',
                fontWeight: 'bold',
                color: 'rgba(84, 51, 129, 1)',
            }}>
                {props.title}</p>
            <div>
                <img src="../public/Images/Search-icon.png" alt="" style={{
                    marginRight: '10px',
                }} />
                <img src="../public/Images/Add-icon.png" alt="" />
            </div>
        </div>
    )
}