package com.example.jwt_rest.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.query.Param;

import com.example.jwt_rest.models.User;

public interface UserDataRepository extends Repository<User, Long> {

    @Query(value = """
        WITH selected_user AS (
            SELECT *
            FROM users
            WHERE username = 'Alex'
        )
        SELECT
            jsonb_build_object(
                'user',
                jsonb_build_object(
                    'id', u.id,
                    'username', u.username,
                    'email', u.email
                ),

                'shops',
                COALESCE(
                    (
                        SELECT jsonb_agg(
                            jsonb_build_object(
                                'shop_info', to_jsonb(s),

                                'products',
                                COALESCE(
                                    (
                                        SELECT jsonb_agg(
                                            to_jsonb(p)
                                        )
                                        FROM (
                                            SELECT DISTINCT p.*
                                            FROM products p
                                            JOIN sale_items si
                                                ON si.product_id = p.id
                                            JOIN sales sa
                                                ON sa.id = si.sale_id
                                            WHERE sa.shop_id = s.id
                                        ) p
                                    ),
                                    '[]'::jsonb
                                ),

                                'employees',
                                COALESCE(
                                    (
                                        SELECT jsonb_agg(
                                            jsonb_build_object(
                                                'id', e.id,
                                                'first_name', e.first_name,
                                                'last_name', e.last_name,
                                                'position', e.position,
                                                'active', e.active
                                            )
                                        )
                                        FROM employees e
                                        WHERE e.shop_id = s.id
                                    ),
                                    '[]'::jsonb
                                ),

                                'sales',
                                COALESCE(
                                    (
                                        SELECT jsonb_agg(
                                            jsonb_build_object(
                                                'sale_info',
                                                  to_jsonb(sa) || jsonb_build_object(
                                                      'employeeName', CONCAT_WS(' ', e.first_name, e.last_name)
                                                  ),

                                                'sale_items',
                                                COALESCE(
                                                    (
                                                        SELECT jsonb_agg(
                                                            to_jsonb(si)
                                                        )
                                                        FROM sale_items si
                                                        WHERE si.sale_id = sa.id
                                                    ),
                                                    '[]'::jsonb
                                                ),

                                                'payments',
                                                COALESCE(
                                                    (
                                                        SELECT jsonb_agg(
                                                            to_jsonb(pa)
                                                        )
                                                        FROM payments pa
                                                        WHERE pa.sale_id = sa.id
                                                    ),
                                                    '[]'::jsonb
                                                )
                                            )
                                        )
                                        FROM sales sa
                                        LEFT JOIN employees e
                                          ON e.id = sa.employee_id
                                        WHERE sa.shop_id = s.id
                                    ),
                                    '[]'::jsonb
                                )
                            )
                        )
                        FROM shops s
                        WHERE s.user_id = u.id
                    ),
                    '[]'::jsonb
                )
            )::text AS user_data

        FROM selected_user u
        """, nativeQuery = true)
    Optional<String> findUserDataByUsername(
            @Param("username") String username
    );
}