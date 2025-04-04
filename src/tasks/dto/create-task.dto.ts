import { IsNotEmpty, Matches } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty({ message: `Property {0} is required` })
  //@Matches(/^[a-zA-Z0-9\s]+$/, {
    //message: 'Property {0} is invalid',
 // })
  title: string;

  @IsNotEmpty({ message: 'Property {0} is required' })
  //@Matches(/^[a-zA-Z0-9\s]+$/, {
   // message: 'Property {0} is invalid',
  //})
  description: string;
}
