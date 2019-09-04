import Command, { worksheetTitle, spreadsheetId } from '../../lib/base-class';

export default class Add extends Command {
  static description = 'Add a worksheet with the specified title to the spreadsheet';

  static examples = [
    `$ gsheet worksheet:add --spreadsheetId=<spreadsheetId> --worksheetTitle=<worksheetTitle>

Worksheet "<worksheetTitle>" (<id>) successfully created
`,
  ];

  static flags = {
    ...Command.flags,
    worksheetTitle,
    spreadsheetId,
  };

  async run() {
    const {
      flags: { worksheetTitle = '', spreadsheetId },
    } = this.parse(Add);

    this.start('Adding worksheet');
    const worksheet = await this.gsheet.addWorksheet(worksheetTitle, spreadsheetId);
    const { properties: { title = '', sheetId = '' } = {} } = worksheet;
    this.stop();
    this.logRaw(`Worksheet "${title}" (${sheetId}) successfully created`, { operation: this.id, ...worksheet });
  }
}
