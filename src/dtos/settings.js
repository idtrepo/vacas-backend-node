export class SettingsDTO {
  static parse = ({ PORT }) => ({
    PORT: parseInt(PORT),
  });
}
