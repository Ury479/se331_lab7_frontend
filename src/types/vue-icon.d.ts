declare module '@jamescoyle/vue-icon' {
  import { DefineComponent } from 'vue'
  
  interface SvgIconProps {
    type: string
    path: string
    size?: number
    horizontal?: boolean
    vertical?: boolean
    rotate?: number
  }

  const SvgIcon: DefineComponent<SvgIconProps>
  export default SvgIcon
}

