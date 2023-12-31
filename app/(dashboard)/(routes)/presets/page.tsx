"use client"

import DataMuseApi from '@/app/api/dataMuseApi/route'

export default function presetButtons(){


    return(
        <div>
            <button onClick={async () => {
                    const wordsMeanLike = DataMuseApi.getWordsMeanLike("president");
                    console.log(wordsMeanLike);
                
                
            }}
            >
            Click me
            </button>
        </div>

    );




}