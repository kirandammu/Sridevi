import React from 'react'
import { assets, footerLinks } from '../assets/assets';
import Title from './Title';

const Footer = () => {

    return (
        <div className="px-6 md:px-16 lg:px-24 xl:px-32 bg-radial to-[#f6c69c] from-[#f0f2f0] mt-20">
            <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-900">
                <div>
                    <Title text1={'sridevi'} text2={'shopping'}/>
                    <p className="max-w-[410px] mt-6">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum unde quaerat eveniet cumque accusamus atque qui error quo enim fugiat?</p>
                </div>
                <div className="grid grid-cols-1 md:flex justify-between w-full md:w-[45%] gap-5">
                    {footerLinks.map((section, index) => (
                        <div key={index}>
                            <h3 className="font-semibold text-base text-black md:mb-5 mb-2">{section.title}</h3>
                            <ul className="text-sm space-y-1">
                                {section.links.map((link, i) => (
                                    <li key={i}>
                                        <a href={link.url} className="hover:underline transition">{link.text}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            <p className="py-4 text-center text-sm md:text-base text-black">
                Copyright {new Date().getFullYear()} © DAMMU KIRAN All - 9390205169 Right Reserved.
            </p>
        </div>
    );
};
export default Footer