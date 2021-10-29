import {Count, CountSchema, Filter, FilterExcludingWhere, repository, Where} from '@loopback/repository';
import { post, param, get, getModelSchemaRef, patch, put, del, requestBody, response, HttpErrors } from '@loopback/rest';
import {FinYear} from '../models/fin-year.model';
import {FinYearRepository} from '../repositories/fin-year.repository';
import { FIN_YEAR_API } from '@shared/server-apis';
import { authenticate } from '@loopback/authentication';
import { authorize } from '@loopback/authorization';
import { resourcePermissions } from '../utils/resource-permissions';
import { adminAndUserAuthDetails } from '../utils/autherize-details';

@authenticate('jwt')
@authorize(adminAndUserAuthDetails)
export class FinYearController {

  constructor(
    @repository(FinYearRepository)
    public finYearRepository : FinYearRepository,
  ) {}

  @post(FIN_YEAR_API)
  @response(200, {
    description: 'FinYear model instance',
    content: {'application/json': {schema: getModelSchemaRef(FinYear)}},
  })
  @authorize({resource: resourcePermissions.finyearCreate.name,
    ...adminAndUserAuthDetails})
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FinYear, {
            title: 'NewFinYear',
            exclude: [ 'id' ],
          }),
        },
      },
    })
      finYear: Omit<FinYear, 'id'>,
  ): Promise<FinYear> {

    const finYearR = await this.finYearRepository.create(finYear);
    return finYearR;

  }

  @get(`${FIN_YEAR_API}/count`)
  @response(200, {
    description: 'FinYear model count',
    content: {'application/json': {schema: CountSchema}},
  })
  @authorize({resource: resourcePermissions.finyearView.name,
    ...adminAndUserAuthDetails})
  async count(
    @param.where(FinYear) where?: Where<FinYear>,
  ): Promise<Count> {

    const countR = await this.finYearRepository.count(where);
    return countR;

  }

  @get(FIN_YEAR_API)
  @response(200, {
    description: 'Array of FinYear model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(FinYear, {includeRelations: true}),
        },
      },
    },
  })
  @authorize({resource: resourcePermissions.finyearView.name,
    ...adminAndUserAuthDetails})
  async find(
    @param.filter(FinYear) filter?: Filter<FinYear>,
  ): Promise<FinYear[]> {

    const finYearsR = await this.finYearRepository.find(filter);
    return finYearsR;

  }

  @patch(FIN_YEAR_API)
  @response(200, {
    description: 'FinYear PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  @authorize({resource: resourcePermissions.finyearUpdate.name,
    ...adminAndUserAuthDetails})
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FinYear, {partial: true}),
        },
      },
    })
      finYear: FinYear,
    @param.where(FinYear) where?: Where<FinYear>,
  ): Promise<Count> {

    const countR = await this.finYearRepository.updateAll(finYear, where);
    return countR;

  }

  @get(`${FIN_YEAR_API}/{id}`)
  @response(200, {
    description: 'FinYear model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(FinYear, {includeRelations: true}),
      },
    },
  })
  @authorize({resource: resourcePermissions.finyearView.name,
    ...adminAndUserAuthDetails})
  async findById(
    @param.path.string('id') id: string,
    @param.filter(FinYear, {exclude: 'where'}) filter?: FilterExcludingWhere<FinYear>
  ): Promise<FinYear> {

    const finYearR = await this.finYearRepository.findById(id, filter);
    return finYearR;

  }

  @patch(`${FIN_YEAR_API}/{id}`)
  @response(204, {
    description: 'FinYear PATCH success',
  })
  @authorize({resource: resourcePermissions.finyearUpdate.name,
    ...adminAndUserAuthDetails})
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FinYear, {partial: true}),
        },
      },
    })
      finYear: FinYear,
  ): Promise<void> {

    await this.finYearRepository.updateById(id, finYear);

  }

  @put(`${FIN_YEAR_API}/{id}`)
  @response(204, {
    description: 'FinYear PUT success',
  })
  @authorize({resource: resourcePermissions.finyearUpdate.name,
    ...adminAndUserAuthDetails})
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() finYear: FinYear,
  ): Promise<void> {

    await this.finYearRepository.replaceById(id, finYear);

  }

  @del(`${FIN_YEAR_API}/{id}`)
  @response(204, {
    description: 'FinYear DELETE success',
  })
  @authorize({resource: resourcePermissions.finyearDelete.name,
    ...adminAndUserAuthDetails})
  async deleteById(@param.path.string('id') id: string): Promise<void> {

    await this.finYearRepository.deleteById(id);

  }


  @del(FIN_YEAR_API)
  @response(204, {
    description: 'Branchs DELETE success count',
    content: {'application/json': {schema: CountSchema}},
  })
  @authorize({resource: resourcePermissions.finyearDelete.name,
    ...adminAndUserAuthDetails})
  async deleteAll(
    @param.where(FinYear) where?: Where<FinYear>,
  ): Promise<Count> {

    if (!where) {

      throw new HttpErrors.Conflict('Invalid parameter : FinYear ids are required');

    }
    const whereC = where as {id: {inq: Array<string>}};
    if (!whereC.id || !whereC.id.inq || whereC.id.inq.length < 1) {

      throw new HttpErrors.Conflict('Invalid parameter : FinYear ids are required');

    }

    const count = await this.finYearRepository.deleteAll(where);
    return count;

  }


}
