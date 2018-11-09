-- FUNCTION: public.assign_auto_to_wash(numeric, numeric)

-- DROP FUNCTION public.assign_auto_to_wash(numeric, numeric);

CREATE OR REPLACE FUNCTION public.assign_auto_to_wash(
	br_id numeric,
	curr_user numeric)
    RETURNS boolean
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE 
AS $BODY$

declare
	success boolean = false;
	re_id numeric[];
	service_type_list numeric[];
	color_group_list numeric[];
	new_wb_id numeric;
	i_re numeric;
	i_sv numeric;
	item_rd_sv numeric[];
	i_rd_sv numeric;
	item_rd_cl numeric[];
	i_rd_cl numeric;
	coun integer;
    all_washer numeric[];
    none_washer numeric[];
    working_washer numeric[];
begin
	re_id = ARRAY(select re.id from receipt re inner join customer_order co on co.id = re.order_id where co.branch_id =  br_id);
	
	foreach i_re in array re_id loop
		begin
			select count(*) into coun from wash_bag where receipt_id = i_re;
			if coun = 0 then 
			begin
			service_type_list = ARRAY (select distinct service_type_id from receipt_detail where receipt_id = i_re);
			foreach i_sv in array service_type_list loop
				begin
					color_group_list = ARRAY(select distinct cg.id from receipt_detail rd 
											 inner join color cl on rd.color_id = cl.id
											 inner join color_group cg on cg.id = cl.color_group_id
											 where receipt_id = i_re and service_type_id = i_sv 
											 and rd.id in (select receipt_detail.id from receipt_detail where receipt_detail.receipt_id = i_re and receipt_detail.service_type_id = i_sv ));
					foreach i_rd_cl in array color_group_list loop
					begin
						new_wb_id = nextVal('wash_bag_seq');
						insert into wash_bag (id, wash_bag_name, create_by, update_by, status, receipt_id)
						values (new_wb_id, 'WB_'||new_wb_id, curr_user,curr_user, 'ACTIVE',i_re );
						
						insert into wash_bag_detail (wash_bag_id, service_type_id, unit_id, label_id, color_id, product_id,
													material_id, amount, create_by, update_by, status)
						select new_wb_id, i_sv, rd.unit_id, rd.label_id,rd.color_id, rd.product_id,rd.material_id,
						 rd.amount, curr_user, curr_user, 'ACTIVE' from receipt_detail rd
						 inner join color cl on rd.color_id = cl.id
						 inner join color_group cg on cg.id = cl.color_group_id
						 and cg.id = i_rd_cl
						 and rd.id in (select receipt_detail.id from receipt_detail where receipt_detail.receipt_id = i_re and receipt_detail.service_type_id = i_sv);
					end;
					end loop;
				 
				end;
			end loop;
		end; end if;
		end;
														  
	end loop;

    all_washer = ARRAY(select id from washing_machine where branch_id= br_id);
    working_washer = ARRAY(select distinct w.washing_machine_id from wash w 
                            inner join washing_machine wm on wm.id = w.washing_machine_id
                            where wm.branch_id= br_id and w.status = 'SERVING');
    none_washer = ARRAY (select id from washing_machine where branch_id= br_id and id <> ANY(working_washer);

    

    if none_washer is null then

    elsif
        
    end if

	return success = true;
end;

$BODY$;

ALTER FUNCTION public.assign_auto_to_wash(numeric, numeric)
    OWNER TO postgres;

GRANT EXECUTE ON FUNCTION public.assign_auto_to_wash(numeric, numeric) TO postgres;

GRANT EXECUTE ON FUNCTION public.assign_auto_to_wash(numeric, numeric) TO PUBLIC;

GRANT EXECUTE ON FUNCTION public.assign_auto_to_wash(numeric, numeric) TO auth_authenticated WITH GRANT OPTION;

