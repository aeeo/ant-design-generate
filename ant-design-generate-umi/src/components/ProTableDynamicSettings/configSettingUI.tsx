export declare type SwitchSize = 'small' | 'default';
export declare type SizeType = 'small' | 'middle' | 'large' | undefined;

// 右侧表单初始化配置

class ConfigSettingUI {
  size: SizeType = 'small';
  switchSize: SwitchSize = 'small';
  radioGroupSize: SizeType = 'small';
  digitSize: SizeType = 'small';
  textSize: SizeType = 'small';
  textAreaSize: SizeType = 'small';
  selectSize: SizeType = 'small';
}
export const configSettingUI = new ConfigSettingUI();
