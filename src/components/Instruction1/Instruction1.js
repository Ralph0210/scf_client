import React, {forwardRef} from 'react'
import './Instruction1.css'
import { motion, useScroll } from "framer-motion"
import InstructionMap from '../InstructionMap/InstructionMap'
import InstructionAnalytics from '../InstructionAnalytics/InstructionAnalytics'

const Instruction1 = (props, ref)=> {

    const fadeIn = {
        hidden: { opacity: 0.3, y: 20 }, // Start with opacity 0 and slight Y translation
        visible: { opacity: 1, y: 0, transition: { duration: 1 } }, // Fade in and move up smoothly
      };

  return (
    <div className='container'ref={ref}>
        <div className='title' >
            <motion.h1  viewport={{ once: true, amount: 0.8 }} initial='hidden' whileInView='visible' variants={fadeIn}>What is the SCF</motion.h1>
        </div>
        <motion.div >
        <InstructionMap />
        </motion.div>
    </div>
  )
}

export default forwardRef(Instruction1)