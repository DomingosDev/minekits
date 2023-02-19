import { useNavigate, BrowserRouter, Link, Route, Routes, useParams} from 'react-router-dom';
import { useState } from 'react';

export default function KitResume(props:any) {
    const navigate = useNavigate();
    let {item, kit, calc} = props;

    return ( 
        <div className="kit-resume">
            <div className="kit-resume_title">Default</div>
            <div className="kit-resume_line">
                <i className="sprite is-xp"></i>{calc.calculateKit(kit)} experience levels
            </div>
        </div>
  ) ;
}