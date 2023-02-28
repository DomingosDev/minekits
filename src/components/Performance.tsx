export default function Performance(props:any) {
    let {performance, setPerformance} = props;

    return (
        <div className="detail_sidebar">
            <div className="detail_header is-new-item">
                Setup your farming performance
            </div>
            <div className="performance_form">
    
                <div className="performance_input">
                    <input type="text" placeholder="Experience" value={performance.data.experience??''} onChange={saveValue.bind(null, 'experience')} />
                    <div className="performance_input-append"><i className="sprite is-xp"></i> / hour</div>
                    
                </div>
    
                <div className="performance_input">
                    <input type="text" placeholder="Emerald" value={performance.data.emerald??''} onChange={saveValue.bind(null, 'emerald')} />
                    <div className="performance_input-append"><i className="sprite is-emerald"></i> / hour</div>
                </div>

                <div className="performance_input">
                    <input type="text" placeholder="Money" value={performance.data.money??''} onChange={saveValue.bind(null, 'money')} />
                    <div className="performance_input-append"><i className="sprite is-coin"></i> / hour</div>
                </div>

            </div>
        </div>
    )

    function saveValue(type: string, event:any){
        setPerformance(performance.set(type, parseInt(event.target.value)))
    }

}